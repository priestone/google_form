import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/edit" element={<Edit></Edit>}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
