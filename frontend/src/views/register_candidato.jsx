import { useEffect, useState } from "react";
import { register, register_candidato } from "../utils/auth";
import Form from "react-bootstrap/Form";
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
      <Form onSubmit={handleSubmit}>
        <h1>Novo Candidato</h1>
        <hr />

        <Form.Group>
          <Form.Label htmlFor="Nome">Nome</Form.Label>
          <Form.Control
            type="text"
            id="first_name"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nome"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirm-password"
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="pretensao_salarial">
            Pretensão Salarial
          </Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            min="0"
            id="pretensao_salarial"
            onChange={(e) => setPretensaoSalarial(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="experiencia">Experiencia</Form.Label>
          <Form.Control
            as="textarea"
            id="experiencia"
            onChange={(e) => setExperiencia(e.target.value)}
            placeholder="experiencia"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="escolaridade">escolaridade minima:</Form.Label>
          <Form.Select
            onChange={(e) => setEscolaridade(e.target.value)}
            id="escolaridade"
            className="form-control"
          >
            {ESCOLARIDADE_MINIMA.map((escolaridade) => (
              <option key={escolaridade.value} value={escolaridade.value}>
                {escolaridade.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <br />
        <button type="submit">Registrar</button>
      </Form>
    </section>
  );
}

export default Register;
