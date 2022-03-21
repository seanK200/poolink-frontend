import React, { useEffect } from 'react';
import EditLinkModal from '../../components/modals/EditLinkModal';
import { useData } from '../../contexts/DataProvider';
import useFetch from '../../hooks/useFetch';

export default function AddLinkRoute({ isRouteModalOpen }) {
  const { handleRouteModalClose, fetchBoard } = useData();

  // Create Link API
  const [createLinkState, createLink] = useFetch('POST', '/links/');

  return <EditLinkModal fetchState={createLinkState} fetcher={createLink} />;
}
