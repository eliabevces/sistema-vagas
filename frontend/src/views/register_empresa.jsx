import { useEffect, useState } from "react";
import { register } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
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
      <Form onSubmit={handleSubmit}>
        <h1>Nova Empresa</h1>
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

        <button type="submit">Registrar</button>
      </Form>
    </section>
  );
}

export default Register;
