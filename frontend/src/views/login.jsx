import { useEffect, useState } from "react";
import { login } from "../utils/auth";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await login(email, password);
    if (error) {
      alert(error);
    } else {
      navigate("/");
      resetForm();
    }
  };
  return (
    <section>
      <h1>Login</h1>
      <hr />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label htmlFor="email">email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <button type="submit">Login</button>
      </Form>
    </section>
  );
};

export default Login;
