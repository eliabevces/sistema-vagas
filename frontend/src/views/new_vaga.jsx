import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { ESCOLARIDADE_MINIMA, FAIXA_SALARIAL } from "../utils/constants";
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
      <form onSubmit={handleSubmit}>
        <h1>Nova vaga</h1>
        <hr />

        <div>
          <label htmlFor="Nome">Titulo da Vaga:</label>
          <input
            type="text"
            id="nome"
            onChange={(e) => setNome(e.target.value)}
            placeholder="Titulo da Vaga"
            required
          />
        </div>

        <div>
          <label htmlFor="faixa_salarial">Faixa salarial:</label>
          <select
            onChange={(e) => setFaixaSalarial(e.target.value)}
            id="faixa_salarial"
            className="form-control"
          >
            {FAIXA_SALARIAL.map((faixa_salarial) => (
              <option key={faixa_salarial.value} value={faixa_salarial.value}>
                {faixa_salarial.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="requisitos">Requisitos</label>
          <textarea
            id="requisitos"
            onChange={(e) => setRequisitos(e.target.value)}
            placeholder="requisitos"
            required
          />
        </div>

        <div>
          <label htmlFor="escolaridade_minima">escolaridade minima:</label>
          <select
            onChange={(e) => setEscolaridadeMinima(e.target.value)}
            id="escolaridade_minima"
            className="form-control"
          >
            {ESCOLARIDADE_MINIMA.map((escolaridade) => (
              <option key={escolaridade.value} value={escolaridade.value}>
                {escolaridade.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default NewVaga;
