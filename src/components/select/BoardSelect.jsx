import React from 'react';
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

export default function BoardSelect({ control, ...props }) {
  const { boards, myBoardIds } = useData();
  const { setValue, handleBlurControl } = control;

  const [newBoardName, newBoardNameIsValid, newBoardNameField] =
    useFieldControl();

  const handleSelect = (boardId) => {
    const boardInfo = boards[boardId];
    setValue(boardInfo);
    newBoardNameField.initializeField();
    handleBlurControl();
  };

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
            />
          </div>
          <BoardList className="no-scrollbar">
            {flatten(myBoardIds).map((boardId, idx) => (
              <SmallBoardItem
                key={boardId}
                idx={idx}
                boardInfo={boards[boardId]}
                onClick={() => handleSelect(boardId)}
              />
            ))}
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
              />
              <Button className="primary small" style={{ flexShrink: '0' }}>
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
  max-height: 144px;
  overflow: auto;
`;

const CreateBoard = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-g7);
`;
