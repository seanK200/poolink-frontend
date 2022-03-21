import React from 'react';
import { useParams } from 'react-router-dom';
import EditLinkModal from '../../components/modals/EditLinkModal';
import { useData } from '../../contexts/DataProvider';
import useFetch from '../../hooks/useFetch';

export default function LinkRoute() {
  const { links } = useData();
  const { linkId } = useParams();

  const [editLinkState, editLink] = useFetch('PATCH', '/links/:id/');

  return (
    <EditLinkModal
      initialLinkInfo={links[linkId] || null}
      fetchState={editLinkState}
      fetcher={editLink}
    />
  );
}
