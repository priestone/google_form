import styled from "styled-components";
import DescriptionIcon from "@mui/icons-material/Description";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Avatar, Button, IconButton, Tab, Tabs } from "@mui/material";
import React from "react";
const Container = styled.div`
  width: 100%;
  height: 100px;
  /* background-color: salmon; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const UpContainer = styled.div`
  width: 100%;
  height: 70px;
  /* background-color: green; */
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    font-size: 2.5rem;
    color: rgb(114, 72, 185);
  }
`;

const Title = styled.div`
  margin: 0 20px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const DownContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: end;
  justify-content: center;
  padding: 0 0 0px 0;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 10px 0;
  gap: 20px;
`;
const Question = styled.div``;
const Response = styled.div``;
const Header = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container>
      <UpContainer>
        <Logo>
          <DescriptionIcon></DescriptionIcon>
          <Title>제목 없는 설문지</Title>
          <IconButton>
            <StarBorderOutlinedIcon
              style={{ color: "#1d1d1d", fontSize: "1.8rem", opacity: 0.7 }}
            ></StarBorderOutlinedIcon>
          </IconButton>
        </Logo>
        <Option>
          <Button variant="contained" style={{ backgroundColor: "#673ab7" }}>
            게시
          </Button>
          <Avatar></Avatar>
        </Option>
      </UpContainer>
      <DownContainer>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="질문" disableRipple />
          <Tab value="two" label="응답" disableRipple />
          <Tab value="three" label="설정" disableRipple />
        </Tabs>
      </DownContainer>
    </Container>
  );
};

export default Header;
