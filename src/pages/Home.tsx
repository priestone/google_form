import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const Home = () => {
  return (
    <Container>
      <Header />
      홈입니다.
    </Container>
  );
};

export default Home;
