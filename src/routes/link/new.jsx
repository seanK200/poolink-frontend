import React from 'react';
import EditLinkModal from '../../components/modals/EditLinkModal';
import useFetch from '../../hooks/useFetch';

export default function AddLinkRoute({ isRouteModalOpen }) {
  // Create Link API
  const [createLinkState, createLink] = useFetch('POST', '/links/');

  return <EditLinkModal fetchState={createLinkState} fetcher={createLink} />;
}
