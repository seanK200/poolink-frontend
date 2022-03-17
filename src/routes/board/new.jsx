import React from 'react';
import EditBoardModal from '../../components/modals/EditBoardModal';
import useFetch from '../../hooks/useFetch';

export default function AddBoardRoute() {
  // Create board API
  const [createBoardState, createBoard] = useFetch('POST', '/boards/');

  return <EditBoardModal fetchState={createBoardState} fetcher={createBoard} />;
}
