import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
