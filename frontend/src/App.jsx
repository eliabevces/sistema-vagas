import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./views/home";
import MainWrapper from "./layouts/MainWrapper";
import Login from "./views/login";
import PrivateRoute from "./layouts/PrivateRoute";
import Logout from "./views/logout";
import PrivateCandidato from "./views/private_candidato";
import PrivateEmpresa from "./views/private_empresa";
import RegisterEmpresa from "./views/register_empresa";
import RegisterCandidato from "./views/register_candidato";
import NewVaga from "./views/new_vaga";
import EditVaga from "./views/edit_vaga";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route
            path="/privateEmpresa"
            element={
              <PrivateRoute>
                <PrivateEmpresa />
              </PrivateRoute>
            }
          />
          <Route
            path="/privateCandidato"
            element={
              <PrivateRoute>
                <PrivateCandidato />
              </PrivateRoute>
            }
          />
          <Route
            path="/editVaga/"
            element={
              <PrivateRoute>
                <EditVaga />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerEmpresa" element={<RegisterEmpresa />} />
          <Route path="/registerCandidato" element={<RegisterCandidato />} />
          <Route path="/newVaga" element={<NewVaga />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
