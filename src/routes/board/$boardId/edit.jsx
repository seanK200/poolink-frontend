import React from 'react';
import { useParams } from 'react-router-dom';
import EditBoardModal from '../../../components/modals/EditBoardModal';
import { useData } from '../../../contexts/DataProvider';
import useFetch from '../../../hooks/useFetch';

export default function EditBoardRoute() {
  const { boards, editBoardState, editBoard } = useData();
  const { boardId } = useParams();

  const boardInfo = boards[boardId] || null;

  return (
    <EditBoardModal
      initialBoardInfo={boardInfo}
      fetchState={editBoardState}
      fetcher={editBoard}
    />
  );
}
