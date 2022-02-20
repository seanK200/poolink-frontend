import React from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataProvider';
import SearchIcon from '../assets/SearchIcon';
import SmallBoardItem from '../SmallBoardItem';
import AutoComplete from './AutoComplete';
import { flatten } from 'lodash';
import useFieldControl from '../../hooks/useFieldControl';
import Form from '../../components/utilites/Form';
import FormField from '../../components/utilites/FormField';
import { Plus } from 'react-bootstrap-icons';

export default function BoardAutoComplete({ control, isInModal }) {
  const { boards, myBoardIds } = useData();

  const [newBoardName, newBoardNameIsValid, newBoardNameField] =
    useFieldControl();

  const BoardItems = flatten(myBoardIds).map((boardId) => {
    return <SmallBoardItem key={boardId} boardInfo={boards[boardId]} />;
  });

  return (
    <AutoComplete control={control} isInModal={isInModal}>
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
            {BoardItems}
            {BoardItems}
            {BoardItems}
          </BoardList>
          <CreateBoard>
            <Form>
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
              </div>
            </Form>
          </CreateBoard>
        </div>
      </Container>
    </AutoComplete>
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
