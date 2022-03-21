import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../buttons/Button';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import BoardSelect from '../select/BoardSelect';
import FormField from '../utilites/FormField';
import Form from '../utilites/Form';
import { useData } from '../../contexts/DataProvider';
import useFieldControl from '../../hooks/useFieldControl';
import { isURL } from 'validator';
import { ADD_LINK_URL_MESSAGE } from '../../consts/strings';
import useRouteModal from '../../hooks/useRouteModal';

export default function EditLinkModal({
  initialLinkInfo,
  fetchState,
  fetcher,
}) {
  const { handleRouteModalClose, fetchBoard, boards } = useData();

  // Form validation
  const [linkUrl, linkUrlIsValid, linkUrlField] = useFieldControl({
    initValues: {
      value: initialLinkInfo?.url || '',
      doValidate: initialLinkInfo?.url ? true : false,
    },
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
  const [linkLabel, linkLabelIsValid, linkLabelField] = useFieldControl({
    initValues: {
      value: initialLinkInfo?.label || '',
      doValidate: initialLinkInfo?.label ? true : false,
    },
  });
  const [linkMemo, linkMemoIsValid, linkMemoField] = useFieldControl({
    required: false,
    initValues: {
      value: initialLinkInfo?.memo || '',
      doValidate: initialLinkInfo?.memo ? true : false,
    },
  });
  const [linkBoard, linkBoardIsValid, linkBoardField] = useFieldControl({
    initValues: {
      value: initialLinkInfo?.board ? boards[initialLinkInfo.board] : '',
      doValidate: initialLinkInfo?.board ? true : false,
    },
  });

  const isFormValid = () => {
    return (
      linkUrlIsValid && linkLabelIsValid && linkMemoIsValid && linkBoardIsValid
    );
  };

  // Create Link API
  const handleSaveChanges = () => {
    if (!isFormValid()) return;
    const data = {
      board: linkBoard.board_id,
      label: linkLabel,
      url: linkUrl,
      memo: linkMemo,
      show: true,
    };
    if (initialLinkInfo) {
      fetcher({ params: { id: initialLinkInfo.link_id }, data });
    } else {
      fetcher({ data });
    }
  };
  useEffect(() => {
    if (fetchState.loading || !fetchState.res) return;
    handleRouteModalClose(null, false);
    fetchBoard({ params: { id: linkBoard.board_id }, useCache: false });
    // eslint-disable-next-line
  }, [fetchState]);

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
            disabled={fetchState.loading}
          />
          <FormField
            label="이름"
            control={linkLabelField}
            placeholder="풀링(Poolink)"
            disabled={fetchState.loading}
          />
          <FormField
            label="설명"
            type="textarea"
            placeholder="링크 저장/공유/탐색 플랫폼"
            control={linkMemoField}
            rows="5"
            disabled={fetchState.loading}
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
            disabled={fetchState.loading}
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
          disabled={fetchState.loading || !isFormValid()}
          onClick={handleSaveChanges}
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
