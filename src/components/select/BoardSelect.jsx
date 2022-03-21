import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataProvider';
import SearchIcon from '../assets/SearchIcon';
import SmallBoardItem from '../SmallBoardItem';
import { flatten } from 'lodash';
import useFieldControl from '../../hooks/useFieldControl';
import FormField from '../../components/utilites/FormField';
import { Plus } from 'react-bootstrap-icons';
import CustomSelect from './CustomSelect';
import Button from '../buttons/Button';
import { useAuth } from '../../contexts/AuthProvider';
import useFetch from '../../hooks/useFetch';

export default function BoardSelect({ control, ...props }) {
  const { userProfile } = useAuth();
  const { boards, myBoardIds, sharedBoardIds, fetchBoard } = useData();
  const { setValue, handleBlurControl } = control;
  const [searchInputValue, setSearchInputValue] = useState('');

  const [newBoardName, newBoardNameIsValid, newBoardNameField] =
    useFieldControl();

  const handleSelect = (boardId) => {
    const boardInfo = boards[boardId];
    setValue(boardInfo);
    newBoardNameField.initializeField();
    handleBlurControl();
  };

  const [createBoardState, createBoard] = useFetch('POST', '/boards/');
  useEffect(() => {
    if (createBoardState.loading || !createBoardState.res) return;
    const newBoardId = createBoardState.res?.data?.id;
    if (newBoardId) fetchBoard({ params: { id: newBoardId } });
  }, [createBoardState]);

  const handleBoardCreate = () => {
    const data = {
      user: userProfile.userId,
      category: [0],
      name: newBoardName,
    };
    createBoard({ data });
  };

  const handleNewBoardInputKeyDown = (e) => {};

  const boardIds = flatten([...myBoardIds, ...sharedBoardIds]).filter(
    (boardId) =>
      searchInputValue
        ? boards[boardId]?.name?.includes(searchInputValue)
        : true
  );

  return (
    <CustomSelect control={control} {...props}>
      <Container>
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--color-g7)',
            borderRadius: '10px',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
            width: '100%',
            height: '100%',
            position: 'relative',
            padding: '8px 16px 0 16px',
          }}
        >
          <div style={{ position: 'relative', marginBottom: '4px' }}>
            <SearchIcon
              loading={false}
              stroke="var(--color-g3)"
              style={{
                position: 'absolute',
                top: 'calc(50% - 1px)',
                left: '8px',
                transform: 'translateY(-50%)',
              }}
            />
            <input
              type="text"
              className="minimal"
              placeholder="보드 검색"
              style={{ paddingLeft: '36px', borderColor: 'var(--color-g7)' }}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
          </div>
          <BoardList className="no-scrollbar">
            {boardIds.map((boardId, idx) => (
              <SmallBoardItem
                key={boardId}
                idx={idx}
                boardInfo={boards[boardId]}
                onClick={() => handleSelect(boardId)}
              />
            ))}
            {!boardIds.length && (
              <NoBoards>
                {searchInputValue ? '검색 결과가 ' : '보드가 '}
                없습니다.
              </NoBoards>
            )}
          </BoardList>
          <CreateBoard>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 0',
              }}
            >
              <Plus
                style={{
                  color: 'var(--color-g6)',
                  fontSize: '1.5rem',
                  position: 'relative',
                  bottom: '1px',
                }}
              />
              <FormField
                type="text"
                className="minimal"
                control={newBoardNameField}
                placeholder="새 보드 이름"
                hideMessage
                onKeyDown={handleNewBoardInputKeyDown}
              />
              <Button
                className="primary small"
                style={{ flexShrink: '0' }}
                disabled={!newBoardNameIsValid}
              >
                만들기
              </Button>
            </div>
          </CreateBoard>
        </div>
      </Container>
    </CustomSelect>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0 24px;
`;

const BoardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  height: 144px;
  overflow: auto;
`;

const NoBoards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-g2);
`;

const CreateBoard = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-g7);
`;
