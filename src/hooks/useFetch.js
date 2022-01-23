import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';

export const API_BASE_URL =
  process.env.API_BASE_URL || 'https://admin.poolink.io/api';

const defaultOptions = {
  config: null,
  useToken: true,
  timeout: 5000,
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

export function useManualFetch(method, url, options = null) {
  options = { ...defaultOptions, options };

  const [fetchState, setFetchState] = useState({
    loading: false,
    fetchArgs: null,
    accessToken: '',
    res: null,
    err: null,
  });

  const {
    poolinkAccessToken = '',
    handleTokenExpire = null,
    isAccessTokenValid = true,
  } = options;

  const fetchData = async ({ data = null, params = null, query = null }) => {
    try {
      setFetchState({
        loading: true,
        fetchArgs: { data, params, query }, // store args in case of retry
        accessToken: poolinkAccessToken.slice(), // a copy of the current token
        res: null,
        err: null,
      });

      // Stop here if access token is invalid.
      // useEffect hook will retry once access token is renewed
      if (!isAccessTokenValid) return;

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
    } catch (e) {
      let newFetchState = { loading: false, res: null, err: e };
      const errorStatusCode = e?.response?.status; // HTTP response status code
      if (errorStatusCode === 401 || errorStatusCode === 403) {
        // invalid access token
        const authorizationHeader = e?.response?.config?.headers?.Authorization;
        const expiredToken =
          authorizationHeader.split(' ').length > 1
            ? authorizationHeader.split(' ')[1]
            : '';

        // tell AuthProvider that access token is no longer valid
        if (typeof handleTokenExpire === 'function') {
          handleTokenExpire(expiredToken);
        }

        // Leave request in loading state
        // useEffect hook will retry once access token is renewed
        newFetchState.loading = true;
      }
      setFetchState((prev) => ({ ...prev, newFetchState }));
    }
  };

  // retry after refreshing access token
  useEffect(() => {
    if (isAccessTokenValid) {
      const { loading, fetchArgs, accessToken, err } = fetchState;

      // Only retry when...
      // Response status is 401 Unauthorized, 403 Forbidden
      const invalidAcessTokenErr =
        err?.respose?.status === 401 || err?.respose?.status === 403;
      // Request used an old access token
      const accessTokenChanged = accessToken !== poolinkAccessToken;
      // and loading state is true
      const shouldRetry =
        loading && (accessTokenChanged || invalidAcessTokenErr);

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
  const { poolinkAccessToken, isAccessTokenValid, handleTokenExpire } =
    useAuth();

  options = {
    ...defaultOptions,
    ...options,
    poolinkAccessToken,
    isAccessTokenValid,
    handleTokenExpire,
  };

  return useManualFetch(method, url, options);
}
