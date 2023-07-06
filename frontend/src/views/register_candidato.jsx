import { useEffect, useState } from "react";
import { register, register_candidato } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { ESCOLARIDADE_MINIMA } from "../utils/constants";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [first_name, setFirstName] = useState("");
  const [pretensao_salarial, setPretensaoSalarial] = useState(0);
  const [experiencia, setExperiencia] = useState("");
  const [escolaridade, setEscolaridade] = useState(1);
  const is_empresa = false;
  const is_candidato = true;
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setFirstName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setPretensaoSalarial(0);
    setExperiencia("");
    setEscolaridade(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != password2) {
      throw new Error("Senhas não conferem");
    }
    const { error } = await register_candidato(
      first_name,
      email,
      password,
      password2,
      is_empresa,
      is_candidato,
      pretensao_salarial,
      experiencia,
      escolaridade
    );
    if (error) {
      alert(JSON.stringify(error));
    } else {
      navigate("/");
      resetForm();
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div>
          <label htmlFor="Nome">Nome</label>
          <input
            type="text"
            id="first_name"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nome"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        </div>
        {/* <div hidden>
          <label>
            <input
              type="checkbox"
              id="is_empresa"
              setEmpresa={(e) => setEmpresa(e.target.value)}
              name="is_empresa"
            />
            Empresa
          </label>
        </div> */}

        <div>
          <label htmlFor="pretensao_salarial">Pretensão Salarial</label>
          <input
            type="number"
            step="0.01"
            min="0"
            id="pretensao_salarial"
            onChange={(e) => setPretensaoSalarial(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="experiencia">Experiencia</label>
          <textarea
            id="experiencia"
            onChange={(e) => setExperiencia(e.target.value)}
            placeholder="experiencia"
            required
          />
        </div>

        <div>
          <label htmlFor="escolaridade">escolaridade minima:</label>
          <select
            onChange={(e) => setEscolaridade(e.target.value)}
            id="escolaridade"
            className="form-control"
          >
            {ESCOLARIDADE_MINIMA.map((escolaridade) => (
              <option value={escolaridade.value}>{escolaridade.label}</option>
            ))}
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
