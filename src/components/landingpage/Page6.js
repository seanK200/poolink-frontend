import styled from 'styled-components';

export default function Page6() {
  return (
    <Container className="lp-container">
      <HeaderWrapper>
        <Header>저장</Header>
        <Header>탐색</Header>
        <Header className="selected">공유</Header>
      </HeaderWrapper>
      <Content>
        <TitleBox>
          <Title className="title">
            공유는
            <br />
            키워드와 이미지로
            <br />
            알아보기 쉽게
          </Title>
          <SubTitle className="subtitle">
            <span>Poolink</span>에 모아놓은
            <br />
            링크를 한번에 보내보세요.
          </SubTitle>
        </TitleBox>
        <Photo
          src={`${process.env.PUBLIC_URL}/images/landingpage/6.png`}
        ></Photo>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 24px;
  @media only screen and (max-width: 768px) {
    padding: 0 10%;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 48px;
`;

const Header = styled.div`
  border: 1px solid #cccccc;
  border-radius: 6px;
  color: #cccccc;
  font-family: SpoqaHanSansNeo;
  font-style: normal;
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: -0.03em;
  text-align: center;
  &.selected {
    border-color: #1f78f4;
    background-color: #1f78f4;
    color: #ffffff;
  }
  padding: 10px 40px;
  margin: 0 5px;
  @media only screen and (max-width: 768px) {
    padding: 1vw 6vw;
    font-size: 4vw;
    border-radius: 6px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 48px 0 0;
  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;

const Title = styled.div`
  margin-bottom: 25px;
  @media only screen and (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const SubTitle = styled.div`
  @media only screen and (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Photo = styled.img`
  width: 45%;
  @media only screen and (max-width: 768px) {
    width: 108%;
    transform: translateX(-4%);
    position: relative;
  }
`;
