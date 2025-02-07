import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div``;

const Wrap = styled.div`
  width: 770px;
  margin: auto;
`;

const TitleWrap = styled.div`
  width: 100%;
  background-color: gray;
`;

const Title = styled.div``;

const QuestionWrap = styled.div``;

const Edit = () => {
  return (
    <Container>
      <Header />
      <Wrap>
        <TitleWrap>
          <Title>제목 없는 설문지</Title>
        </TitleWrap>
        <QuestionWrap></QuestionWrap>
      </Wrap>
    </Container>
  );
};

export default Edit;
