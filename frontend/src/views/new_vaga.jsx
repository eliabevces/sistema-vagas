import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { ESCOLARIDADE_MINIMA, FAIXA_SALARIAL } from "../utils/constants";
import Form from "react-bootstrap/Form";
import useAxios from "../utils/useAxios";

const NewVaga = () => {
  const [nome, setNome] = useState("");
  const [faixa_salarial, setFaixaSalarial] = useState(1);
  const [requisitos, setRequisitos] = useState("");
  const [escolaridade_minima, setEscolaridadeMinima] = useState(1);
  const isEmpresaLoggedIn = useAuthStore((state) => state.isEmpresaLoggedIn);
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpresaLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setNome("");
    setFaixaSalarial(1);
    setRequisitos("");
    setEscolaridadeMinima(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await api.post("/vagas/", {
        nome,
        faixa_salarial,
        requisitos,
        escolaridade_minima,
      });
      navigate("/");
      resetForm();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <h1>Nova vaga</h1>
        <hr />

        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label htmlFor="Nome">Titulo da Vaga:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            id="nome"
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        {/* <div>
          <label htmlFor="Nome">Titulo da Vaga:</label>
          <input
            type="text"
            id="nome"
            onChange={(e) => setNome(e.target.value)}
            placeholder="Titulo da Vaga"
            required
          />
        </div> */}

        <Form.Group>
          <Form.Label htmlFor="faixa_salarial">Faixa salarial:</Form.Label>
          <Form.Select
            onChange={(e) => setFaixaSalarial(e.target.value)}
            id="faixa_salarial"
            className="form-control"
          >
            {FAIXA_SALARIAL.map((faixa_salarial) => (
              <option key={faixa_salarial.value} value={faixa_salarial.value}>
                {faixa_salarial.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="requisitos">Requisitos</Form.Label>
          <Form.Control
            as="textarea"
            id="requisitos"
            onChange={(e) => setRequisitos(e.target.value)}
            placeholder="requisitos"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="escolaridade_minima">
            escolaridade minima:
          </Form.Label>
          <Form.Select
            onChange={(e) => setEscolaridadeMinima(e.target.value)}
            id="escolaridade_minima"
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

        <button type="submit">Criar</button>
      </Form>
      <br />
      <Link to="/">
        <button>Volta</button>
      </Link>
    </section>
  );
};

export default NewVaga;
