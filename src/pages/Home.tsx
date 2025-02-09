import styled from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const Home = () => {
  return (
    <Container>
      <Header />
      <Link to={"/edit"}>에딧가기</Link>
      홈입니다.
    </Container>
  );
};

export default Home;
