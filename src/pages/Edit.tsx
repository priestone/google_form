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
  Switch,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

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
  position: relative;
`;

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

const QuestionWrap = styled.div<{ isActive: boolean }>`
  margin-top: 10px;
  border-left: ${(props) => (props.isActive ? "4px solid #4285f4" : "none")};
`;

/* 질문 박스는 flex column 구조, 하단에 컨트롤 패널을 포함 */
const Question = styled.div`
  width: 100%;
  min-height: 120px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/* 하단 컨트롤 패널: 투명도가 섞인 검정 선으로 분리 */
const QuestionControlPanel = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 16px;
  padding-top: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

/* 리모컨: Wrap 컨테이너 기준 absolute 위치, 질문 폼 옆 (20px 간격) */
const RemoteControl = styled.div<{ top: number }>`
  position: absolute;
  left: calc(100% + 20px);
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: top 0.3s ease;
  top: ${(props) => props.top}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Edit = () => {
  // 1) 활성화 영역 상태
  // 활성화 영역: "title" 혹은 "question" 또는 null
  const [activeWrap, setActiveWrap] = React.useState<
    "title" | "question" | null
  >(null);

  // 다수의 질문을 관리할 경우 활성 질문의 인덱스 상태
  const [activeQuestionIndex, setActiveQuestionIndex] = React.useState<
    number | null
  >(null);

  // 질문 컴포넌트들에 대한 ref 배열 (여러 질문을 관리할 때)
  const questionRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // remote control의 top 위치 계산:
  // - activeWrap이 "title"이거나 기본(default)일 경우 0,
  // - activeWrap이 "question"이면 활성 질문의 offsetTop 값을 사용
  const remoteTop = React.useMemo(() => {
    if (activeWrap === "question" && activeQuestionIndex !== null) {
      const activeElem = questionRefs.current[activeQuestionIndex];
      return activeElem ? activeElem.offsetTop : 0;
    }
    return 0;
  }, [activeWrap, activeQuestionIndex]);

  // 2) 질문 유형 및 옵션 관리
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

  // 3) 질문 제목의 Bold/Italic/Underline 처리
  const [qtitleFormats, setQtitleFormats] = React.useState<string[]>([]);
  const [qtitleValue, setQtitleValue] = React.useState("");
  const handleQtitleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setQtitleFormats(newFormats);
  };

  const questionTextStyle: React.CSSProperties = {
    fontWeight: qtitleFormats.includes("bold") ? "bold" : "normal",
    fontStyle: qtitleFormats.includes("italic") ? "italic" : "normal",
    textDecoration: qtitleFormats.includes("underlined") ? "underline" : "none",
    fontSize: 16,
  };

  // 4) 설문 전체 Title/Desc 관련 상태
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 5) 질문 유형별 옵션 렌더링 (옵션 추가 버튼은 컨트롤 패널에서 처리)
  const renderQuestionOptions = () => {
    switch (questionType) {
      case "radio":
        return (
          <RadioGroup>
            {options.map((opt, index) => (
              <FormControlLabel
                key={index}
                value={String(index)}
                control={<Radio disabled />}
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

  // 6) 질문 복사 및 삭제 기능 (여러 질문 관리 시 배열 조작으로 확장 가능)
  const handleCopyQuestion = () => {
    console.log("Question copied!");
  };

  const handleDeleteQuestion = () => {
    console.log("Question deleted!");
    setQtitleValue("");
    setOptions([""]);
    setQuestionType("radio");
  };

  // 7) 필수 여부 상태 (MUI Switch 사용)
  const [isRequired, setIsRequired] = React.useState(false);

  return (
    <Container>
      <Header />
      <Wrap>
        {/* 리모컨: Wrap 컨테이너 기준 절대 위치 (폼 옆 20px 간격) */}
        <RemoteControl top={remoteTop}>새 질문 작성</RemoteControl>

        {/* (A) TITLE WRAP */}
        <TitleWrap
          onClick={() => setActiveWrap("title")}
          isActive={activeWrap === "title"}
        >
          <PurpleBar />
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

        {/* (B) QUESTION WRAP */}
        <QuestionWrap
          onClick={() => {
            setActiveWrap("question");
            setActiveQuestionIndex(0);
          }}
          isActive={activeWrap === "question"}
          ref={(el) => {
            questionRefs.current[0] = el;
          }}
        >
          <Question>
            {/* 질문 제목 및 드롭다운: flex 컨테이너에 alignItems를 flex-start로 지정 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "16px",
                gap: "16px",
                position: "relative",
              }}
            >
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
                  inputProps={{ style: questionTextStyle }}
                  sx={{
                    width: "100%",
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "rgb(114, 72, 185)",
                    },
                  }}
                />
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
              <Select
                value={questionType}
                onChange={handleTypeChange}
                variant="standard"
                sx={{ width: 120, alignSelf: "flex-start" }}
              >
                <MenuItem value="radio">객관식</MenuItem>
                <MenuItem value="checkbox">체크박스</MenuItem>
                <MenuItem value="short">단답형</MenuItem>
                <MenuItem value="long">장문형</MenuItem>
              </Select>
            </div>

            {/* 질문 옵션 영역 */}
            {renderQuestionOptions()}

            {/* 하단 컨트롤 패널 */}
            <QuestionControlPanel>
              {(questionType === "radio" || questionType === "checkbox") && (
                <Button onClick={handleAddOption} variant="text">
                  옵션 추가
                </Button>
              )}
              <Tooltip title="복사하기" arrow>
                <IconButton
                  onClick={handleCopyQuestion}
                  aria-label="copy question"
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="삭제하기" arrow>
                <IconButton
                  onClick={handleDeleteQuestion}
                  aria-label="delete question"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <FormControlLabel
                control={
                  <Switch
                    checked={isRequired}
                    onChange={() => setIsRequired(!isRequired)}
                    color="primary"
                  />
                }
                label="필수"
              />
            </QuestionControlPanel>
          </Question>
        </QuestionWrap>
      </Wrap>
    </Container>
  );
};

export default Edit;
