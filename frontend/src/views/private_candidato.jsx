import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import useAxios from "../utils/useAxios";

const PrivateCandidato = () => {
  const isCandidatoLoggedIn = useAuthStore(
    (state) => state.isCandidatoLoggedIn
  );
  const [vagas_ativas, setVagasAtivas] = useState([]);
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCandidatoLoggedIn()) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await api.get("/inscrever_vagas/");
        setVagasAtivas(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const InscreverVaga = async (id) => {
    try {
      console.log(id);
      await api.patch("/inscrever_vagas/", { id });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <table>
        <tbody>
          {vagas_ativas.map((vaga) => (
            <tr key={vaga.id}>
              <td>{vaga.nome}</td>
              <td>{vaga.faixa_salarial}</td>
              <td>{vaga.requisitos}</td>
              <td>{vaga.escolaridade_minima}</td>
              <td>
                <button
                  className="submit-btn"
                  onClick={() => InscreverVaga(vaga.id)}
                >
                  Inscrever
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </section>
  );
};

export default PrivateCandidato;
