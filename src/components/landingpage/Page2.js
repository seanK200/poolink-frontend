import styled from 'styled-components';

export default function Page2() {
  return (
    <Container className="lp-container">
      <Title className="title">
        어제 저장한 그 링크,
        <br />
        지금 어디있나요?
      </Title>
      <SubTitle className="subtitle">
        이는 기존의 서비스들이 링크에
        <br />
        특화되어 있지 않기 때문에 발생하는 문제입니다.
      </SubTitle>
      <UnderBox>
        <SquareContainer>
          <Square>
            <ImageContainer>
              <Photo1
                src={`${process.env.PUBLIC_URL}/images/landingpage/2-1.png`}
              ></Photo1>
            </ImageContainer>
            <Problem>
              끝도 없이
              <br />
              올려야 하는 스크롤
            </Problem>
          </Square>
          <Square>
            <ImageContainer>
              <Photo2
                src={`${process.env.PUBLIC_URL}/images/landingpage/2-2.png`}
              ></Photo2>
            </ImageContainer>
            <Problem>
              가독성이 떨어지는
              <br />
              URL 주소
            </Problem>
          </Square>
          <Square>
            <ImageContainer>
              <Photo3
                src={`${process.env.PUBLIC_URL}/images/landingpage/2-3.png`}
              ></Photo3>
            </ImageContainer>
            <Problem>
              분류가 안 되어
              <br />
              섞여있는 링크
            </Problem>
          </Square>
        </SquareContainer>
      </UnderBox>
    </Container>
  );
}

const Container = styled.div`
  max-width: initial;
`;

const Title = styled.div`
  text-align: center;
`;

const SubTitle = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const UnderBox = styled.div`
  background-color: #d8e6fd;
  width: 100%;
  padding: 40px 0;
`;
const SquareContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    width: 80%;
    max-width: 400px;
  }
`;

const Square = styled.div`
  background-color: #3d81f5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: 1 1 30%;
  margin: 0 16px 0 16px;
  @media only screen and (max-width: 768px) {
    margin: 0 0 32px 0;
  }
`;
const ImageContainer = styled.div`
  background: #ffffff;
  border-radius: 10px 10px 0 0;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Problem = styled.div`
  color: #ffffff;
  padding: 24px 0;
  font-family: SpoqaHanSansNeo;
  font-style: normal;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.4;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.4;
  }
`;

const Photo1 = styled.img`
  width: 50%;
  margin-left: 7%;
  @media only screen and (max-width: 768px) {
  }
`;

const Photo2 = styled.img`
  width: 85%;
`;

const Photo3 = styled.img`
  width: 45%;
  @media only screen and (max-width: 768px) {
  }
`;
