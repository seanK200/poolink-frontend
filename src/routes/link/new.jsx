import React from 'react';
import styled from 'styled-components';
import ModalHeader from '../../components/modals/ModalHeader';
import Form from '../../components/utilites/Form';
import FormField from '../../components/utilites/FormField';
import useFieldControl from '../../hooks/useFieldControl';

export default function AddLinkRoute({ isRouteModalOpen }) {
  const [linkUrl, linkUrlIsValid, linkUrlField] = useFieldControl();
  const [linkLabel, linkLabelIsValid, linkLabelField] = useFieldControl();
  const [linkMemo, linkMemoIsValid, linkMemoField] = useFieldControl();
  const [linkBoardId, linkBoardIdIsValid, linkBoardIdField] = useFieldControl();

  return (
    <React.Fragment>
      <ModalHeader heading="링크 추가하기" />
      <Container
        className={
          isRouteModalOpen ? 'RouteModal__Content-container' : undefined
        }
      >
        <Form id="form-add-link">
          <FormField
            label="URL"
            control={linkUrlField}
            placeholder="https://poolink.io"
          />
          <FormField
            label="이름"
            control={linkLabelField}
            placeholder="풀링(Poolink)"
          />
          <FormField
            label="설명"
            type="textarea"
            placeholder="링크 저장/공유/탐색 플랫폼"
            control={linkMemoField}
            rows="5"
          />
          <FormField
            label="보드"
            type="select"
            placeholder="내 보드"
            control={linkBoardIdField}
          />
        </Form>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
