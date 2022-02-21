import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../components/buttons/Button';
import ModalFooter from '../../components/modals/ModalFooter';
import ModalHeader from '../../components/modals/ModalHeader';
import BoardSelect from '../../components/select/BoardSelect';
import Form from '../../components/utilites/Form';
import FormField from '../../components/utilites/FormField';
import { useData } from '../../contexts/DataProvider';
import useFieldControl from '../../hooks/useFieldControl';

export default function AddLinkRoute({ isRouteModalOpen }) {
  const { setRouteModalSize, handleRouteModalClose, windowSize } = useData();

  const [linkUrl, linkUrlIsValid, linkUrlField] = useFieldControl();
  const [linkLabel, linkLabelIsValid, linkLabelField] = useFieldControl();
  const [linkMemo, linkMemoIsValid, linkMemoField] = useFieldControl({
    required: false,
  });
  const [linkBoardId, linkBoardIdIsValid, linkBoardIdField] = useFieldControl();

  const [containerPadding, setContainerPadding] = useState(0);
  const [modalFooterShadow, setModalFooterShadow] = useState(false);
  const containerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    setRouteModalSize('small');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!containerRef.current || !footerRef.current) return;
    const { height } = footerRef.current.getBoundingClientRect();
    setContainerPadding(height);
  }, [containerRef, footerRef]);

  useEffect(() => {
    if (!containerRef.current || !footerRef.current) return;
    const { height } = containerRef.current.getBoundingClientRect();
    const scrollHeight = containerRef.current.scrollHeight;
    setModalFooterShadow(scrollHeight > height);
  }, [containerRef, footerRef, windowSize]);

  const isFormValid = () => {
    return (
      linkUrlIsValid &&
      linkLabelIsValid &&
      linkMemoIsValid &&
      linkBoardIdIsValid
    );
  };

  return (
    <React.Fragment>
      <ModalHeader heading="링크 추가하기" />
      <Container
        className="RouteModal__Content-container small autocomplete-container"
        style={{ paddingBottom: containerPadding || '0px' }}
        ref={containerRef}
      >
        <Form id="form-add-link" isValid={isFormValid()}>
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
            customSelect={
              <BoardSelect control={linkBoardIdField} isInModal={true} />
            }
            displayValue={(value) => value.name}
          />
        </Form>
      </Container>
      <ModalFooter
        footerRef={footerRef}
        shadow={modalFooterShadow}
        style={{ display: 'flex', justifyContent: 'right' }}
      >
        <Button
          className="gray large"
          style={{ marginRight: '16px' }}
          onClick={(e) => handleRouteModalClose(e, true)}
        >
          취소
        </Button>
        <Button className="primary large">저장하기</Button>
      </ModalFooter>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ containerPadding }) => containerPadding}px;
`;
