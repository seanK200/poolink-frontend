import React from 'react';
import styled from 'styled-components';
import Logo from './assets/Logo';
import Button from './buttons/Button';
import ShowMobile from './utilites/ShowMobile';
import { PlusLg } from 'react-bootstrap-icons';

export default function Topbar() {
  return (
    <StyledTopbar>
      <div>
        <ShowMobile style={{ paddingLeft: '24px' }}>
          <Logo style={{ width: '109px' }} />
        </ShowMobile>
      </div>
      <div>
        <ShowMobile style={{ paddingRight: '24px' }}>
          <Button className="secondary small" icon={<PlusLg />}>
            링크 추가
          </Button>
        </ShowMobile>
      </div>
    </StyledTopbar>
  );
}

const StyledTopbar = styled.div`
  width: 100%;
  height: 88px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;
