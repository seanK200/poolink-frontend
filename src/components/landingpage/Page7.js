import styled from 'styled-components';

export default function Page7() {
  return (
    <Container className="lp-container">
      <Title1 className="title">아래의 탭이 일상이라면?</Title1>
      <Photo src={`${process.env.PUBLIC_URL}/images/landingpage/7.png`}></Photo>
      <Title2 className="title">
        누구보다 빠르게
        <br />
        <span>Poolink</span>를 사용해보세요.
      </Title2>
      <SubTitle className="subtitle">
        버튼을 누르면
        <br />
        <span>Poolink</span> 출시 알림을 보내드려요!
      </SubTitle>
      <Button
        onClick={() => {
          window.open(
            'https://docs.google.com/forms/d/1OxOUg2lFJDJGz2k3N2kb3VBc6chODgkGhez6a2o0wRo/edit'
          );
        }}
      >
        알림을 받고싶어요!
      </Button>
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

const Title1 = styled.div`
  color: #313131;
  margin-bottom: 30px;
  @media only screen and (max-width: 768px) {
    margin-bottom: 43px;
  }
`;

const Photo = styled.img`
  width: 80%;
  margin: 0;
  @media only screen and (max-width: 768px) {
    width: 90%;
    margin-bottom: 50px;
  }
`;

const Title2 = styled.div`
  color: #4e4e4e;
  margin: 80px 0 75px 0;
  text-align: center;
  & span {
    color: #3d81f5;
    font-family: AvenirLTStd;
    font-weight: 700;
    font-style: normal;
    letter-spacing: -0.06em;
  }
  @media only screen and (max-width: 768px) {
    & span {
      font-size: 7vw;
    }
  }
`;

const SubTitle = styled.div`
  margin-bottom: 40px;
  text-align: center;
  & span {
    font-family: AvenirLTStd;
    font-weight: 400;
    font-style: normal;
    letter-spacing: -0.06em;
  }
  @media only screen and (max-width: 768px) {
    & span {
      font-size: 3.5vw;
    }
  }
`;

const Button = styled.div`
  border-radius: 10px;
  background-color: #1f78f4;
  color: #ffffff;
  font-family: SpoqaHanSansNeo;
  font-style: normal;
  font-weight: bold;
  font-size: 1.75rem;
  line-height: 1em;
  letter-spacing: -0.06em;
  text-align: center;
  padding: 24px 56px;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    font-size: 4.5vw;
    padding: 3.5vw 9vw;
  }
  &:hover {
    opacity: 0.9;
  }
`;
