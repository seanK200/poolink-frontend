import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/buttons/Button';
import ModalFooter from '../../components/modals/ModalFooter';
import ModalHeader from '../../components/modals/ModalHeader';
import BoardSelect from '../../components/select/BoardSelect';
import Form from '../../components/utilites/Form';
import FormField from '../../components/utilites/FormField';
import { useData } from '../../contexts/DataProvider';
import useFieldControl from '../../hooks/useFieldControl';
import { isURL } from 'validator';
import { ADD_LINK_URL_MESSAGE } from '../../consts/strings';
import useFetch from '../../hooks/useFetch';
import useRouteModal from '../../hooks/useRouteModal';

export default function AddLinkRoute({ isRouteModalOpen }) {
  const { handleRouteModalClose, fetchBoard } = useData();

  // Form validation
  const [linkUrl, linkUrlIsValid, linkUrlField] = useFieldControl({
    messages: ADD_LINK_URL_MESSAGE,
    validator: (value) => {
      if (!isURL(value)) {
        return 'invalidURL';
      }
      if (!isURL(value, { require_protocol: true })) {
        return 'invalidURLProtocol';
      }
      return '';
    },
  });
  const [linkLabel, linkLabelIsValid, linkLabelField] = useFieldControl();
  const [linkMemo, linkMemoIsValid, linkMemoField] = useFieldControl({
    required: false,
  });
  const [linkBoard, linkBoardIsValid, linkBoardField] = useFieldControl();

  const isFormValid = () => {
    return (
      linkUrlIsValid && linkLabelIsValid && linkMemoIsValid && linkBoardIsValid
    );
  };

  // Create Link API
  const [createLinkState, createLink] = useFetch('POST', '/links/');
  const handleLinkCreate = () => {
    if (!isFormValid()) return;
    const data = {
      board: linkBoard.board_id,
      label: linkLabel,
      url: linkUrl,
      memo: linkMemo,
      show: true,
    };
    createLink({ data });
  };
  useEffect(() => {
    if (createLinkState.loading || !createLinkState.res) return;
    handleRouteModalClose(null, false);
    fetchBoard({ params: { id: linkBoard.board_id }, useCache: false });
    // eslint-disable-next-line
  }, [createLinkState]);

  // RouteModal
  const { containerPadding, showModalFooterShadow, containerRef, footerRef } =
    useRouteModal('small');

  return (
    <React.Fragment>
      <ModalHeader heading="링크 추가하기" />
      <Container
        className="RouteModal__Content-container small autocomplete-container"
        style={{
          paddingBottom: containerPadding ? `${containerPadding}px` : '0px',
        }}
        ref={containerRef}
      >
        <Form id="form-add-link" isValid={isFormValid()}>
          <FormField
            label="URL"
            control={linkUrlField}
            placeholder="https://poolink.io"
            disabled={createLinkState.loading}
          />
          <FormField
            label="이름"
            control={linkLabelField}
            placeholder="풀링(Poolink)"
            disabled={createLinkState.loading}
          />
          <FormField
            label="설명"
            type="textarea"
            placeholder="링크 저장/공유/탐색 플랫폼"
            control={linkMemoField}
            rows="5"
            disabled={createLinkState.loading}
          />
          <FormField
            label="보드"
            type="select"
            placeholder="내 보드"
            control={linkBoardField}
            customSelect={
              <BoardSelect control={linkBoardField} isInModal={true} />
            }
            displayValue={(value) => value.name}
            disabled={createLinkState.loading}
          />
        </Form>
      </Container>
      <ModalFooter
        footerRef={footerRef}
        shadow={showModalFooterShadow}
        style={{ display: 'flex', justifyContent: 'right' }}
      >
        <Button
          className="gray large"
          style={{ marginRight: '16px' }}
          onClick={(e) => handleRouteModalClose(e, true)}
        >
          취소
        </Button>
        <Button
          className="primary large"
          disabled={createLinkState.loading || !isFormValid()}
          onClick={handleLinkCreate}
        >
          저장하기
        </Button>
      </ModalFooter>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
