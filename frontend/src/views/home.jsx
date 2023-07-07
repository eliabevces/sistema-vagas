import { Link } from "react-router-dom";
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
        <h1>Welcome Empresa {user.first_name}</h1>
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
        <h1>Welcome Candidato {user.first_name}</h1>
        <Link to="/private">
          <button>Private</button>
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
  );
};

export default Home;
