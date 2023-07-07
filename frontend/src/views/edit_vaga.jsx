import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useAuthStore } from "../store/auth";
import { ESCOLARIDADE_MINIMA, FAIXA_SALARIAL } from "../utils/constants";
import useAxios from "../utils/useAxios";

const EditVaga = (props) => {
  const [id, setId] = useState(0);
  const [nome, setNome] = useState("");
  const [faixa_salarial, setFaixaSalarial] = useState(1);
  const [requisitos, setRequisitos] = useState("");
  const [escolaridade_minima, setEscolaridadeMinima] = useState(1);
  const isEmpresaLoggedIn = useAuthStore((state) => state.isEmpresaLoggedIn);
  const queryParameters = new URLSearchParams(window.location.search);
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpresaLoggedIn()) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        setId(queryParameters.get("id"));
        setNome(queryParameters.get("nome"));
        setFaixaSalarial(queryParameters.get("faixa_salarial"));
        setRequisitos(queryParameters.get("requisitos"));
        setEscolaridadeMinima(queryParameters.get("escolaridade_minima"));
        console.log(queryParameters.get("nome"));
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
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
      const { error } = await api.patch("/vagas/", {
        id,
        nome,
        faixa_salarial,
        requisitos,
        escolaridade_minima,
      });
      navigate("/privateEmpresa");
      resetForm();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <h1>Editar Vaga</h1>
        <hr />

        <Form.Group>
          <Form.Label htmlFor="Nome">Titulo da Vaga:</Form.Label>
          <Form.Control
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Titulo da Vaga"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="faixa_salarial">Faixa salarial:</Form.Label>
          <Form.Select
            onChange={(e) => setFaixaSalarial(e.target.value)}
            id="faixa_salarial"
            className="form-control"
            value={faixa_salarial}
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
            value={requisitos}
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
            value={escolaridade_minima}
          >
            {ESCOLARIDADE_MINIMA.map((escolaridade) => (
              <option key={escolaridade.value} value={escolaridade.value}>
                {escolaridade.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <br />
        <button type="submit">Editar</button>
      </Form>
    </section>
  );
};

export default EditVaga;
