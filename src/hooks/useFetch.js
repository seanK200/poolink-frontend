import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';

export const API_BASE_URL =
  process.env.API_BASE_URL || 'https://admin.poolink.io/api';

const defaultOptions = {
  config: null,
  useToken: true,
  timeout: 5000,
  useCache: false,
  cacheRefreshInterval: 2 * 60 * 1000, // 2 mins (in ms),
  attemptTokenRefresh: true,
};

function getFinalUrl(url, params, query) {
  // let finalUrl = addBaseUrl ? API_BASE_URL : '';
  let finalUrl = '';
  if (params) {
    const splitUrl = url.split('/');
    for (let i = 0; i < splitUrl.length; i++) {
      const pathValue = splitUrl[i];
      if (pathValue === '') {
        finalUrl += i === 0 ? '' : '/';
      } else {
        finalUrl += '/';
      }
      if (pathValue[0] === ':') {
        finalUrl += params[pathValue.slice(1)];
      } else {
        finalUrl += pathValue;
      }
    }
  } else {
    finalUrl += url;
  }

  if (query) {
    let firstParameter = true;
    for (const parameter in query) {
      if (firstParameter) {
        finalUrl += `?${parameter}=${encodeURI(query[parameter])}`;
        firstParameter = false;
      } else {
        finalUrl += `&${parameter}=${encodeURI(query[parameter])}`;
      }
    }
  }

  return finalUrl;
}

function isObject(obj) {
  return obj != null && typeof obj === 'object';
}

function deepEquals(obj1, obj2) {
  if (obj1 === obj2) return true;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj2[key]) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        (areObjects && !deepEquals(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

export function useManualFetch(method, url, options = null) {
  options = { ...defaultOptions, ...options };

  const [fetchState, setFetchState] = useState({
    loading: false,
    fetchArgs: null,
    accessToken: '',
    res: null,
    err: null,
  });

  const [cache, setCache] = useState([]);
  // cacheData = {
  //   fetchArgs: { data, params, query },
  //   res: {},
  //   lastUpdate: Date.getTime
  // }

  const {
    poolinkAccessToken,
    handleTokenExpire,
    isAccessTokenValid,
    isLoggedIn,
    navigateToLogin,
    initialTokenValidated,
  } = options;

  const fetchData = async (
    { data, params, query, useCache } = {
      data: null,
      params: null,
      query: null,
      useCache: true,
    }
  ) => {
    try {
      setFetchState({
        loading: true,
        fetchArgs: { data, params, query, useCache }, // store args in case of retry
        accessToken: poolinkAccessToken.slice(), // a copy of the current token
        res: null,
        err: null,
      });

      // Stop here if initial token validation hasn't taken place yet
      // useEffect will retry once it has been validated
      if (!initialTokenValidated) {
        console.log(
          `useFetch(${method}, ${url}): Waiting for initial token validation.`
        );
        return;
      }

      // Stop here if access token is invalid.
      // useEffect will retry once access token is renewed
      if (options.useToken && !isAccessTokenValid) {
        if (!isLoggedIn()) {
          console.log(
            `useFetch(${method}, ${url}): Not logged in. Navigate to login.`
          );
          navigateToLogin();
        }
        return;
      }

      // caching
      let isCacheAvailable = false;
      let isCacheValid = false;
      let cachedRes = null;
      let cacheFoundIdx = -1;
      let staleCacheIdx = [];

      // if caching is enabled
      if (options.useCache && useCache) {
        let idx = 0;
        const currentTime = new Date.getTime();

        for (const cacheData of cache) {
          // check if cached data is available
          const { fetchArgs: cachedFetchArgs, res, lastUpdate } = cacheData;
          const currentFetchArgs = { data, params, query };

          if (deepEquals(currentFetchArgs, cachedFetchArgs)) {
            isCacheAvailable = true; // cache hit!
            cacheFoundIdx = idx;

            // is this cache fresh enough?
            if (currentTime - lastUpdate <= options.cacheRefreshInterval) {
              // if so, use it!
              isCacheValid = true;
              cachedRes = res;
            } else {
              // stale cash. mark for deletion
              staleCacheIdx.push(idx);
            }
          } else {
            // check if cache is stale
            if (currentTime - lastUpdate > options.cacheRefreshInterval) {
              // stale cash. mark for deletion
              staleCacheIdx.push(idx);
            }
          }
          idx++;
        }
      }

      if (isCacheAvailable && isCacheValid) {
        // use cached response
        setFetchState((prev) => ({ ...prev, loading: false, res: cachedRes }));

        // remove stale caches
        setCache((prev) => {
          return prev.filter((data, idx) => !staleCacheIdx.includes(idx));
        });
      } else {
        // make request and wait for response
        const res = await axios.request({
          baseURL: API_BASE_URL,
          timeout: options.timeout,
          url: getFinalUrl(url, params, query),
          method: method,
          data: data,
          headers: options.useToken
            ? { Authorization: `Bearer ${poolinkAccessToken}` }
            : null,
          ...options.config,
        });

        // update state with response
        setFetchState((prev) => ({ ...prev, loading: false, res: res }));

        // remove stale caches and refresh cache with new information
        if (options.useCache) {
          setCache((prev) => {
            // filter stale ones and one to be refreshed
            const newCache = prev.filter(
              (data, idx) =>
                idx !== cacheFoundIdx && !staleCacheIdx.includes(idx)
            );

            // refresh cache
            newCache.push({
              fetchArgs: { data, params, query },
              res: res,
              lastUpdate: new Date().getTime(),
            });

            return newCache;
          });
        }
      }
    } catch (e) {
      console.log(e);
      let newFetchState = { loading: false, res: null, err: e };
      const errorStatusCode = e?.response?.status; // HTTP response status code
      if (
        options.useToken &&
        options.attemptTokenRefresh &&
        (errorStatusCode === 401 || errorStatusCode === 403)
      ) {
        // invalid access token
        const authorizationHeader =
          e?.response?.config?.headers?.Authorization || '';
        const expiredToken =
          authorizationHeader.split(' ').length > 1
            ? authorizationHeader.split(' ')[1]
            : '';

        // tell AuthProvider that access token is no longer valid
        if (typeof handleTokenExpire === 'function') {
          handleTokenExpire(expiredToken);
          console.log(`useFetch(${method}, ${url}): Access token expired.`);
        }

        // Leave request in loading state
        // useEffect hook will retry once access token is renewed
        newFetchState.loading = true;
      }
      setFetchState((prev) => ({ ...prev, ...newFetchState }));
    }
  };

  // auto retry after initial token validation
  useEffect(() => {
    if (initialTokenValidated) {
      const { loading, err, fetchArgs } = fetchState;

      // if in loading state, retry
      if (loading && !err) {
        fetchData(fetchArgs);
      }
    }
    // eslint-disable-next-line
  }, [initialTokenValidated]);

  // auto retry after refreshing access token
  useEffect(() => {
    if (isAccessTokenValid) {
      // only retry when loading state is true
      // if not, it has never been attempted before, so no need to retry
      const { loading, fetchArgs } = fetchState;
      const shouldRetry = loading;

      // retry with same arguments
      if (shouldRetry) {
        fetchData(fetchArgs);
      }
    }
    // eslint-disable-next-line
  }, [isAccessTokenValid]);

  return [fetchState, fetchData];
}

export default function useFetch(method, url, options = null) {
  const {
    poolinkAccessToken,
    isAccessTokenValid,
    handleTokenExpire,
    isLoggedIn,
    navigateToLogin,
    initialTokenValidated,
  } = useAuth();

  options = {
    ...defaultOptions,
    ...options,
    poolinkAccessToken,
    isAccessTokenValid,
    handleTokenExpire,
    isLoggedIn,
    navigateToLogin,
    initialTokenValidated,
  };

  return useManualFetch(method, url, options);
}
