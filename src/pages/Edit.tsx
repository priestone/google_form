import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

/* ----------------------------------
   styled-components 
---------------------------------- */
const Container = styled.div`
  background-color: #f8f8fe;
  min-height: 100vh;
  position: relative;
`;

const Wrap = styled.div`
  width: 770px;
  margin: 20px auto;
`;

/* "isActive" prop으로 선택 시 왼쪽 보더에 파란색 강조 */
const TitleWrap = styled.div<{ isActive: boolean }>`
  width: 100%;
  background-color: #fff;
  padding-top: 22px;
  padding-bottom: 24px;
  padding-left: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;

  /* 왼쪽 파란 테두리 (선택된 경우만) */
  border-left: ${(props) => (props.isActive ? "4px solid #4285f4" : "none")};
`;

const PurpleBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #7248b9;
  border-radius: 8px 8px 0 0;
`;

const TitleFieldContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const DescFieldContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

/* QuestionWrap 자체도 클릭했을 때 isActive로 파란 선 표시 */
const QuestionWrap = styled.div<{ isActive: boolean }>`
  margin-top: 10px;
  border-left: ${(props) => (props.isActive ? "4px solid #4285f4" : "none")};
`;

const Question = styled.div`
  width: 100%;
  min-height: 80px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

/* 리모컨 - activeWrap에 따라 위치 이동 */
const RemoteControl = styled.div<{ top: number }>`
  position: fixed;
  right: 10%;
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: top 0.3s ease; /* 부드러운 이동 */
  top: ${(props) => props.top}px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Edit = () => {
  /* ----------------------------------
     1) 전역 상태: 어느 영역이 클릭되었나?
       - "title"이면 TitleWrap, "question"이면 QuestionWrap, null이면 아직 선택되지 않음
  ---------------------------------- */
  const [activeWrap, setActiveWrap] = React.useState<
    "title" | "question" | null
  >(null);

  /* 리모컨의 top 위치를 계산 (예시: title=100px, question=300px, default=-100px 숨김) */
  const remoteTop = React.useMemo(() => {
    switch (activeWrap) {
      case "title":
        return 100;
      case "question":
        return 300;
      default:
        return -80; // 화면 밖 (숨김)
    }
  }, [activeWrap]);

  /* ----------------------------------
     2) 질문 유형 + 옵션 (객관식/체크박스/단답/장문)
  ---------------------------------- */
  const [questionType, setQuestionType] = React.useState("radio");
  const [options, setOptions] = React.useState<string[]>([""]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, newValue: string) => {
    const updated = [...options];
    updated[index] = newValue;
    setOptions(updated);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setQuestionType(event.target.value);
  };

  /* ----------------------------------
     3) 질문 제목에 대한 Bold/Italic/Underline
        -> TextField에 style로 적용
  ---------------------------------- */
  const [qtitleFormats, setQtitleFormats] = React.useState<string[]>([]);
  const [qtitleValue, setQtitleValue] = React.useState(""); // 질문 문구

  const handleQtitleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setQtitleFormats(newFormats);
  };

  /* TextField style 동적 적용 */
  const questionTextStyle: React.CSSProperties = {
    fontWeight: qtitleFormats.includes("bold") ? "bold" : "normal",
    fontStyle: qtitleFormats.includes("italic") ? "italic" : "normal",
    textDecoration: qtitleFormats.includes("underlined") ? "underline" : "none",
    fontSize: 16,
  };

  /* ----------------------------------
     4) 설문 전체 Title/Desc
        Bold/Italic/Underline 적용하려면 
        같은 로직을 쓰면 됨. (여기서는 예시로만 둠)
  ---------------------------------- */
  const [titleFormats, setTitleFormats] = React.useState<string[]>([]);
  const [descFormats, setDescFormats] = React.useState<string[]>([]);

  const titleRef = React.useRef<HTMLDivElement>(null);
  const descRef = React.useRef<HTMLDivElement>(null);
  const qtitleRef = React.useRef<HTMLDivElement>(null);

  const [isTitleActive, setIsTitleActive] = React.useState(false);
  const [isDescActive, setIsDescActive] = React.useState(false);
  const [isQtitleActive, setIsQtitleActive] = React.useState(false);

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

  /* ----------------------------------
     5) 영역 밖 클릭 -> 포커스 해제
  ---------------------------------- */
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (titleRef.current && !titleRef.current.contains(target)) {
        setIsTitleActive(false);
      }
      if (descRef.current && !descRef.current.contains(target)) {
        setIsDescActive(false);
      }
      if (qtitleRef.current && !qtitleRef.current.contains(target)) {
        setIsQtitleActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ----------------------------------
     6) 질문 유형별 옵션 렌더링
        - 단답형/장문형일 땐 '옵션 추가' 버튼 제거
  ---------------------------------- */
  const renderQuestionOptions = () => {
    switch (questionType) {
      case "radio":
        return (
          <RadioGroup>
            {options.map((opt, index) => (
              <FormControlLabel
                key={index}
                value={String(index)}
                control={<Radio disabled />} // 미리보기로 클릭 비활성
                style={{ marginBottom: "8px" }}
                label={
                  <>
                    <TextField
                      variant="standard"
                      placeholder={`옵션 ${index + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      sx={{ width: "500px", marginLeft: "8px" }}
                    />
                    <IconButton
                      onClick={() => handleRemoveOption(index)}
                      size="small"
                      sx={{ marginLeft: "8px" }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </>
                }
              />
            ))}

            {/* 객관식일 때만 옵션 추가 버튼 */}
            <Button
              onClick={handleAddOption}
              variant="text"
              style={{ marginLeft: 32 }}
            >
              옵션 추가
            </Button>
          </RadioGroup>
        );
      case "checkbox":
        return (
          <>
            {options.map((opt, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox disabled />
                <TextField
                  variant="standard"
                  placeholder={`옵션 ${index + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  sx={{ width: "500px", marginLeft: "8px" }}
                />
                <IconButton
                  onClick={() => handleRemoveOption(index)}
                  size="small"
                  sx={{ marginLeft: "8px" }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </div>
            ))}

            {/* 체크박스일 때만 옵션 추가 */}
            <Button
              onClick={handleAddOption}
              variant="text"
              style={{ marginLeft: 32 }}
            >
              옵션 추가
            </Button>
          </>
        );
      case "short":
        return (
          <TextField
            variant="standard"
            placeholder="사용자가 단답형으로 입력"
            disabled
            sx={{ width: "100%" }}
          />
        );
      case "long":
        return (
          <TextField
            variant="outlined"
            placeholder="사용자가 장문형으로 입력"
            disabled
            multiline
            rows={3}
            sx={{ width: "100%" }}
          />
        );
      default:
        return null;
    }
  };

  /* ----------------------------------
     7) 렌더링
  ---------------------------------- */
  return (
    <Container>
      <Header />

      {/* 리모컨 - 클릭된 영역에 따라 위치 이동 */}
      <RemoteControl top={remoteTop}>새 질문 작성</RemoteControl>

      <Wrap>
        {/* -------- (A) TITLE WRAP -------- */}
        <TitleWrap
          onClick={() => setActiveWrap("title")}
          isActive={activeWrap === "title"}
        >
          <PurpleBar />

          {/* 설문지 '제목' */}
          <TitleFieldContainer ref={titleRef}>
            <TextField
              variant="standard"
              placeholder="설문지 제목"
              onFocus={() => {
                setIsTitleActive(true);
                setActiveWrap("title");
              }}
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
            {isTitleActive && (
              <ToggleButtonGroup
                value={titleFormats}
                onChange={handleTitleFormat}
                aria-label="title text formatting"
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
          </TitleFieldContainer>

          {/* 설문지 '설명' */}
          <DescFieldContainer ref={descRef}>
            <TextField
              variant="standard"
              placeholder="설문지 설명"
              onFocus={() => {
                setIsDescActive(true);
                setActiveWrap("title");
              }}
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

        {/* -------- (B) QUESTION WRAP -------- */}
        <QuestionWrap
          onClick={() => setActiveWrap("question")}
          isActive={activeWrap === "question"}
        >
          <Question>
            {/* (1) 질문 제목 (문자 조절 토글 + Bold/Italic/Underline) */}
            <div style={{ display: "flex", marginBottom: "16px", gap: "16px" }}>
              <div
                ref={qtitleRef}
                style={{ flex: 1 }}
                onClick={() => setActiveWrap("question")}
              >
                <TextField
                  variant="standard"
                  placeholder="질문 제목"
                  value={qtitleValue}
                  onChange={(e) => setQtitleValue(e.target.value)}
                  onFocus={() => {
                    setIsQtitleActive(true);
                    setActiveWrap("question");
                  }}
                  /* style 객체로 글자 굵기/밑줄 적용 */
                  inputProps={{ style: questionTextStyle }}
                  sx={{
                    width: "100%",
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "rgb(114, 72, 185)",
                    },
                  }}
                />
                {/* 토글 버튼 (질문 제목 전용) */}
                {isQtitleActive && (
                  <ToggleButtonGroup
                    value={qtitleFormats}
                    onChange={handleQtitleFormat}
                    aria-label="question title text formatting"
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
              </div>

              {/* (2) 드롭다운 (Select) - 질문 유형 선택 */}
              <Select
                value={questionType}
                onChange={handleTypeChange}
                variant="standard"
                sx={{ width: 120 }}
              >
                <MenuItem value="radio">객관식</MenuItem>
                <MenuItem value="checkbox">체크박스</MenuItem>
                <MenuItem value="short">단답형</MenuItem>
                <MenuItem value="long">장문형</MenuItem>
              </Select>
            </div>

            {/* (3) 질문 유형별 옵션/입력 영역 */}
            {renderQuestionOptions()}
          </Question>
        </QuestionWrap>
      </Wrap>
    </Container>
  );
};

export default Edit;
