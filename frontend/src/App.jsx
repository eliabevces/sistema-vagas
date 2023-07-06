import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./views/home";
import MainWrapper from "./layouts/MainWrapper";
import Login from "./views/login";
import PrivateRoute from "./layouts/PrivateRoute";
import Logout from "./views/logout";
import Private from "./views/private";
import RegisterEmpresa from "./views/register_empresa";
import RegisterCandidato from "./views/register_candidato";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <Private />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegisterEmpresa" element={<RegisterEmpresa />} />
          <Route path="/RegisterCandidato" element={<RegisterCandidato />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
