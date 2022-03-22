import React, { useEffect } from 'react';
import styled from 'styled-components';
import useRouteModal from '../../hooks/useRouteModal';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import Form from '../utilites/Form';
import FormField from '../utilites/FormField';
import useFieldControl from '../../hooks/useFieldControl';
import Button from '../buttons/Button';
import { useData } from '../../contexts/DataProvider';
import { useAuth } from '../../contexts/AuthProvider';

export default function EditBoardModal({
  initialBoardInfo,
  fetchState,
  fetcher,
}) {
  const { userProfile } = useAuth();
  const { handleRouteModalClose, updateBoard, fetchMyBoards } = useData();

  if (initialBoardInfo?.bio === null) {
    initialBoardInfo.bio = '';
  }

  // RouteModal
  const { containerPadding, showModalFooterShadow, containerRef, footerRef } =
    useRouteModal('small');

  // Fields
  const [boardEmoji, isBoardEmojiValid, boardEmojiField] = useFieldControl({
    required: false,
    initValues: {
      value:
        initialBoardInfo?.emoji === undefined ? null : initialBoardInfo.emoji,
      doValidate: initialBoardInfo?.emoji === undefined ? false : true,
    },
  });
  const [boardName, isBoardNameValid, boardNameField] = useFieldControl({
    initValues: {
      value: initialBoardInfo?.name || '',
      doValidate: initialBoardInfo?.name ? true : false,
    },
  });
  const [boardBio, isBoardBioValid, boardBioField] = useFieldControl({
    required: false,
    initValues: {
      value: initialBoardInfo?.bio || '',
      doValidate: initialBoardInfo?.bio ? true : false,
    },
  });
  const [boardTags, isBoardTagsValid, boardTagsField] = useFieldControl({
    required: false,
    initValues: {
      value: initialBoardInfo?.tags?.map((tag) => tag.name) || [],
      doValidate: initialBoardInfo?.tags?.length ? true : false,
    },
  });

  const isFormValid = () => {
    return (
      isBoardEmojiValid &&
      isBoardNameValid &&
      isBoardBioValid &&
      isBoardTagsValid
    );
  };

  const unsavedChangesExist = () => {
    if (!initialBoardInfo) return false;
    let changesExist =
      initialBoardInfo.emoji !== boardEmoji ||
      initialBoardInfo.name !== boardName ||
      initialBoardInfo.bio !== boardBio;

    // deep compare tags
    if (initialBoardInfo.tags.length !== boardTags.length) {
      changesExist = true;
    } else {
      for (let i = 0; i < boardTags.length; i++) {
        if (boardTags[i] !== initialBoardInfo.tags[i].name) {
          changesExist = true;
          break;
        }
      }
    }

    return changesExist;
  };

  const handleFormSubmit = (e) => {
    if (!isFormValid()) return;
    let data = {};
    if (initialBoardInfo) {
      // edit board
      data = {
        emoji: boardEmoji,
        name: boardName,
        bio: boardBio,
        tags: boardTags.map((tagName) => ({ name: tagName })),
        user: userProfile.userId,
      };
      fetcher({ params: { id: initialBoardInfo.board_id }, data });
    } else {
      // create board
      data = {
        name: boardName,
        user: userProfile.userId,
        tags: boardTags,
      };
      fetcher({ data });
    }
  };

  useEffect(() => {
    if (fetchState?.loading || !fetchState?.res) return;
    handleRouteModalClose(null, false);

    // update
    if (initialBoardInfo) {
      const updatedBoardInfo = fetchState.res.data;
      updateBoard(updatedBoardInfo);
    } else {
      fetchMyBoards({ query: { page: 1 }, useCache: false });
    }
    // eslint-disable-next-line
  }, [fetchState]);

  return (
    <React.Fragment>
      <ModalHeader heading={`보드 ${initialBoardInfo ? '수정' : '추가'}하기`} />
      <Container
        className="RouteModal__Content-container small autocomplete-container"
        ref={containerRef}
        style={{
          paddingBottom: containerPadding ? `${containerPadding}px` : '0px',
        }}
      >
        <Form id="form-edit-board" onSubmit={handleFormSubmit}>
          <FormField
            type="emoji"
            labelImgSrc={process.env.PUBLIC_URL + '/assets/EmojiIcon.png'}
            labelImgAlt="이모티콘"
            control={boardEmojiField}
            placeholder="보드 아이콘 선택"
            disabled={fetchState.loading}
          />
          <FormField
            label="보드 이름"
            control={boardNameField}
            placeholder="보드 이름 입력"
            disabled={fetchState.loading}
          />
          <FormField
            label="보드 설명"
            type="textarea"
            control={boardBioField}
            placeholder="보드에 대한 설명을 적어주세요"
            rows="5"
            disabled={fetchState.loading}
          />
          <FormField
            label="태그"
            type="tag"
            control={boardTagsField}
            placeholder="보드를 대표할 만한 태그를 선택해주세요"
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
          disabled={
            !isFormValid() ||
            fetchState.loading ||
            (initialBoardInfo && !unsavedChangesExist())
          }
          onClick={handleFormSubmit}
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
