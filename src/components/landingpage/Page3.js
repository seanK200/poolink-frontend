import styled from 'styled-components';

export default function Page3() {
  return (
    <Container className="lp-container">
      <Title className="title">
        어딘가에 저장해놓은 링크,
        <br />
        다시 찾기 어렵지 않으셨나요?
      </Title>
      <Photo src={`${process.env.PUBLIC_URL}/images/landingpage/3.png`}></Photo>
      <SubTitle className="subtitle">
        이제 <span>Poolink</span>로<br />
        간편하게 정리하고 쉽게 찾으세요!
      </SubTitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1440px;
`;

const Title = styled.div`
  text-align: center;
`;

const Photo = styled.img`
  width: 70%;
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const SubTitle = styled.div`
  color: #313131;
  text-align: center;
  font-weight: bold;
  margin-top: 45px;
  font-size: 2rem;
  & span {
    color: #3d81f5;
    font-family: AvenirLTStd;
    font-weight: 700;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 30px;
    letter-spacing: -0.02em;
    font-size: 5.2vw;
    & span {
      letter-spacing: -0.03em;
    }
  }
`;
