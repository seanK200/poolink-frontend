import styled from 'styled-components';

export default function Page1() {
  return (
    <Container>
      <PhotoContainer>
        <Photo1
          src={`${process.env.PUBLIC_URL}/images/landingpage/1-4.png`}
        ></Photo1>
      </PhotoContainer>
      <Title>
        나만의 풀로
        <br />
        링크를
        <br />
        <span>Poolink </span>
        <Photo2
          src={`${process.env.PUBLIC_URL}/images/landingpage/1-2.png`}
        ></Photo2>
      </Title>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  position: relative;
  margin-bottom: 130px;
`;

const PhotoContainer = styled.div`
  overflow-x: hidden;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Photo1 = styled.img`
  position: static;
  width: 115%;
  @media only screen and (max-width: 768px) {
    width: 190%;
  }
`;

const Title = styled.div`
  position: absolute;
  left: 5vw;
  bottom: 20px;
  color: #313131;
  display: inline;
  font-family: SpoqaHanSansNeo;
  font-style: normal;
  font-weight: bold;
  font-size: 4rem;
  line-height: 1.35;
  & span {
    color: #3d81f5;
    font-family: AvenirLTStd;
    font-weight: 900;
    font-size: 5rem;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  @media only screen and (max-width: 768px) {
    position: relative;
    bottom: 50px;
    z-index: 0;
    font-size: 11vw;
    & span {
      font-size: 13vw;
      line-height: 1.3;
    }
  }
`;

const Photo2 = styled.img`
  width: 4rem;
  @media only screen and (max-width: 768px) {
    width: 11vw;
  }
`;

// ${} : 이 안에 있는 변수의 값을 스트링으로 바꿔서 js의 문법을 html에서 쓸 수 있게 해줌
// {} : 이 안에서는 js문법을 html에서 쓸 수 있게 해줌
// ``(백틱) : ${}를 사용할 때 백틱으로 싸줘야 함.
// ${}와 백틱은 문자열을 이어주는 +연산을 html에서 하고 싶어서 사용하는 것! 얘네도 {}로 다시 감싸줘야 함.

// const Container = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100vh;
//   max-width: 1920px;
//   max-height: 1080px;
//   border: 1px solid black;
// `

// const Title = styled.div`
// color: #313131;
// display: inline;
// & span {
//   color: #3D81F5;
//   font-family: AvenirLTStd;
//   font-style: normal;
//   font-weight: 900;
//   font-size: 111px;
//   line-height: 120px;
//   letter-spacing: -0.03em;
// }
//   position: absolute;
//   left: 4.64vw;
//   top: 59%;
//   width: 38%;
//   height: 34%;
//   font-family: SpoqaHanSansNeo;
//   font-style: normal;
//   font-weight: bold;
//   font-size: 111px;
//   line-height: 120px;
//   letter-spacing: -0.03em;
// `
// css selector
// & : 자기 자신
// & span : 자기 자신 안에 있는 모든 span 태그를 말함

// const Photo1 = styled.img`
//   width: 1000px;
//   right: 0;
//   position: absolute;
//   width: 94%;
//   height: 100vh;
// `
//
// {process.env.PUBLIC_URL + '/images/landingpage/1.png'}
// {`${process.env.PUBLIC_URL}/images/landingpage/1.png`}
// 둘은 같은 코드!

// const Photo2 = styled.img`

// `
