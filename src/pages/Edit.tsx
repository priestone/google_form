import styled from "styled-components";
import Header from "../components/Header";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import React from "react";

// --------------------------------------------------
// styled-components
// --------------------------------------------------
const Container = styled.div`
  background-color: #f8f8fe;
  min-height: 100vh;
`;

const Wrap = styled.div`
  width: 770px;
  margin: 20px auto;
`;

const TitleWrap = styled.div`
  width: 100%;
  background-color: #fff;
  padding-top: 22px;
  padding-bottom: 24px;
  padding-left: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const PurpleBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px; /* 높이만큼 보라색 bar */
  background-color: #7248b9;
  border-radius: 8px 8px 0 0;
`;

// (1) 제목과 토글 버튼을 묶을 컨테이너
const TitleFieldContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

// (2) 설명과 토글 버튼을 묶을 컨테이너
const DescFieldContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const QuestionWrap = styled.div`
  margin-top: 10px;
`;

const Question = styled.div`
  width: 100%;
  min-height: 80px; /* 내용에 따라 유동적으로 늘어나도록. 고정 높이는 최소화 */
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin-bottom: 10px; /* 질문 카드 간격 */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// --------------------------------------------------
// 컴포넌트
// --------------------------------------------------
const Edit = () => {
  // 1) 토글 상태 (서로 독립)
  const [titleFormats, setTitleFormats] = React.useState<string[]>([]);
  const [descFormats, setDescFormats] = React.useState<string[]>([]);

  // 2) 컨테이너 ref (제목/설명 따로)
  const titleRef = React.useRef<HTMLDivElement>(null);
  const descRef = React.useRef<HTMLDivElement>(null);

  // 3) 포커스(활성) 상태 (서로 독립)
  const [isTitleActive, setIsTitleActive] = React.useState(false);
  const [isDescActive, setIsDescActive] = React.useState(false);

  // 4) 토글 변경 핸들러
  const handleTitleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setTitleFormats(newFormats);
  };

  const handleDescFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setDescFormats(newFormats);
  };

  // --------------------------------------------------
  // [Outside Click] 감지해서 포커스 해제 처리
  // --------------------------------------------------
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      // Title 영역 밖 클릭 시
      if (titleRef.current && !titleRef.current.contains(target)) {
        setIsTitleActive(false);
      }
      // Desc 영역 밖 클릭 시
      if (descRef.current && !descRef.current.contains(target)) {
        setIsDescActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // 한 번만 등록

  return (
    <Container>
      <Header />
      <Wrap>
        <TitleWrap>
          <PurpleBar />
          <TitleFieldContainer ref={titleRef}>
            <TextField
              variant="standard"
              placeholder="설문지 제목"
              // onFocus만 사용, 여기서 활성화
              onFocus={() => setIsTitleActive(true)}
              // onBlur 제거
              inputProps={{ style: { fontSize: 30 } }}
              sx={{
                width: "90%",
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rgb(114, 72, 185)",
                  fontSize: "30px",
                  fontWeight: "600",
                },
              }}
            />
            {/* 
              isTitleActive가 true면 토글 표시 
            */}
            {isTitleActive && (
              <ToggleButtonGroup
                value={titleFormats}
                onChange={handleTitleFormat}
                aria-label="title text formatting"
                style={{ marginTop: "10px" }} // 여백
              >
                <ToggleButton value="bold" aria-label="bold">
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined">
                  <FormatUnderlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          </TitleFieldContainer>

          {/*
            -----------------------------------------
             (B) 설명 Field + 토글
             - 같은 div 안에 묶고, ref 달기
            -----------------------------------------
          */}
          <DescFieldContainer ref={descRef}>
            <TextField
              variant="standard"
              placeholder="설문지 설명"
              onFocus={() => setIsDescActive(true)}
              inputProps={{ style: { fontSize: 16 } }}
              size="small"
              sx={{
                width: "90%",
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rgb(114, 72, 185)",
                },
              }}
            />
            {isDescActive && (
              <ToggleButtonGroup
                value={descFormats}
                onChange={handleDescFormat}
                aria-label="desc text formatting"
                style={{ marginTop: "10px" }}
              >
                <ToggleButton value="bold" aria-label="bold">
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined">
                  <FormatUnderlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          </DescFieldContainer>
        </TitleWrap>
        <QuestionWrap>
          <Question>
            <TextField
              variant="standard"
              placeholder="제목 없는 질문"
              sx={{ marginBottom: "8px" }}
            />
            <RadioGroup>
              <FormControlLabel
                value="option1"
                control={<Radio />}
                label="옵션1"
              />
              <FormControlLabel
                value="option2"
                control={<Radio />}
                label="옵션2"
              />
            </RadioGroup>
          </Question>
        </QuestionWrap>
      </Wrap>
    </Container>
  );
};

export default Edit;
