import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useAuthStore } from "../store/auth";

const Home = () => {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  return (
    <div>
      {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
    </div>
  );
};

const LoggedInView = ({ user }) => {
  if (user.is_empresa) {
    return (
      <div>
        <h1>Pagina da empresa</h1>
        <h2>Bem vindo {user.first_name}</h2>
        <Link to="/privateEmpresa">
          <button>Listar Vagas</button>
        </Link>
        <Link to="/NewVaga">
          <button>Nova Vaga</button>
        </Link>
        <Link to="/logout">
          <button>Logout</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Pagina do Candidato</h1>
        <h1>Bem Vindo {user.first_name}</h1>
        <Link to="/privateCandidato">
          <button>Procurar Vagas</button>
        </Link>
        <Link to="/logout">
          <button>Logout</button>
        </Link>
      </div>
    );
  }
};

export const LoggedOutView = ({ title = "Home" }) => {
  return (
    <Container className="p-3">
      <div>
        <h1>{title}</h1>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/RegisterEmpresa">
          <button>Registrar Empresa</button>
        </Link>
        <Link to="/RegisterCandidato">
          <button>Registrar Candidato</button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
