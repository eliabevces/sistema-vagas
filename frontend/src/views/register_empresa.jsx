import { useEffect, useState } from "react";
import { register } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const is_empresa = true;
  const is_candidato = false;
  const [first_name, setFirstName] = useState("");
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await register(
      first_name,
      email,
      password,
      password2,
      is_empresa,
      is_candidato
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

        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
