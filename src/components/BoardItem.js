import React from 'react';
import { useData } from '../contexts/DataProvider';
import { useAuth } from '../contexts/AuthProvider';
import Button from './buttons/Button';
import styled from 'styled-components';

export default function BoardItem({ boardInfo }) {
  const { links } = useData();

  const { userProfile } = useAuth();

  return (
    <BoardItemContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <BoardName className="no-scrollbar">{boardInfo.name}</BoardName>
        <ButtonContainer>
          {boardInfo.user !== userProfile.userId && (
            <Button
              icon={
                <img
                  src={process.env.PUBLIC_URL + '/assets/ScrapIcon.png'}
                  alt="Scrap"
                />
              }
              style={{
                width: '25px',
                height: '25px',
                fontSize: '1.1rem',
                marginRight: '5px',
              }}
            />
          )}
          <Button
            icon={
              <img
                src={process.env.PUBLIC_URL + '/assets/KebabButton.png'}
                alt="Menu"
              />
            }
            style={{
              width: '25px',
              height: '25px',
              fontSize: '1.1rem',
            }}
          />
        </ButtonContainer>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <LinkContainer key={0}>
            <Favicon
              faviconSrc={
                boardInfo.links.length >= 1
                  ? links[boardInfo.links[0]].favicon
                  : ''
              }
            />
            <LinkLabel>
              {boardInfo.links.length >= 1
                ? links[boardInfo.links[0]].label
                : ''}
            </LinkLabel>
          </LinkContainer>
          <LinkContainer key={1}>
            <Favicon
              faviconSrc={
                boardInfo.links.length >= 2
                  ? links[boardInfo.links[1]].favicon
                  : ''
              }
            />
            <LinkLabel>
              {boardInfo.links.length >= 2
                ? links[boardInfo.links[1]].label
                : ''}
            </LinkLabel>
          </LinkContainer>
        </div>
        <Button
          icon={
            <img
              src={process.env.PUBLIC_URL + '/assets/FavoritesIcon.png'}
              alt="Favorites"
            />
          }
          style={{
            width: '25px',
            fontSize: '1.3rem',
          }}
        />
      </div>
    </BoardItemContainer>
  );
}

const BoardItemContainer = styled.div`
  width: 345px;
  height: 190px;
  margin: 16px;
  padding: 28px 24px;
  background-color: white;
  filter: drop-shadow(0 0 8px rgba(219, 224, 231, 0.7));
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BoardName = styled.div`
  font-weight: 500;
  font-size: 1rem;
  height: 60px;
  margin-bottom: 10px;
  word-break: normal;
  overflow: auto;
  flex-grow: 1;
  padding-right: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const LinkContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Favicon = styled.div`
  width: 17px;
  height: 17px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  ${(props) =>
    props.faviconSrc
      ? `background-image: url(${props.faviconSrc});`
      : 'background-color: none;'}
  margin-right: 8px;
`;
// '${}': string안에서 변수를 사용하기 위해서
// {}: jsx에서 js문법을 쓰기 위한 것

const LinkLabel = styled.div`
  font-size: 0.875rem;
  color: var(--color-g5);
`;
