import styled from "styled-components";
import Header from "../components/Header";
import { TextField } from "@mui/material";

const Container = styled.div``;

const Wrap = styled.div`
  width: 770px;
  margin: 20px auto;
`;

const TitleWrap = styled.div`
  width: 100%;
  height: auto;
  padding-top: 22px;
  padding-bottom: 24px;
  /* background-color: gray; */
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border-top: 10px solid rgb(114, 72, 185);
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`;

const QuestionWrap = styled.div``;

const Edit = () => {
  return (
    <Container>
      <Header />
      <Wrap>
        <TitleWrap>
          <TextField
            variant="standard"
            placeholder="설문지 제목"
            inputProps={{ style: { fontSize: 30 } }}
            sx={{
              width: "90%",
              marginBottom: "10px",
              "& .MuiInput-underline:after": {
                borderBottomColor: "rgb(114, 72, 185)",
              },
            }}
          ></TextField>
          <TextField
            variant="standard"
            placeholder="설문지 설명"
            inputProps={{ style: { fontSize: 16 } }}
            size="small"
            sx={{
              width: "90%",
              "& .MuiInput-underline:after": {
                borderBottomColor: "rgb(114, 72, 185)",
              },
            }}
          ></TextField>
        </TitleWrap>
        <QuestionWrap></QuestionWrap>
      </Wrap>
    </Container>
  );
};

export default Edit;
