import styled from 'styled-components';

export default function Page4() {
  return (
    <Container className="lp-container">
      <HeaderWrapper>
        <Header>저장</Header>
        <Header className="selected">탐색</Header>
        <Header>공유</Header>
      </HeaderWrapper>
      <Content>
        <TitleBox>
          <Title className="title">
            당신만을 위한
            <br />
            취향저격
            <br />
            웹사이트 모음
          </Title>
          <SubTitle className="subtitle">
            관심 키워드를 설정하여
            <br />
            매일 업데이트되는
            <br />
            사이트들을 탐색하세요.
          </SubTitle>
        </TitleBox>
        <Photo
          src={`${process.env.PUBLIC_URL}/images/landingpage/5-3.png`}
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
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 108%;
    transform: translateX(-4%);
    position: relative;
  }
`;
