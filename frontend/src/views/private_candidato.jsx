import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useAuthStore } from "../store/auth";
import useAxios from "../utils/useAxios";
import { FAIXA_SALARIAL, ESCOLARIDADE_MINIMA } from "../utils/constants";

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
        let vagas = response.data;
        for (let i = 0; i < response.data.length; i++) {
          const response2 = await api.get(
            "/userInfo/" + response.data[i].empresa + "/"
          );

          vagas[i].empresa = response2.data;
        }

        setVagasAtivas(vagas);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const InscreverVaga = async (id) => {
    try {
      await api.patch("/inscrever_vagas/", { id });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <th>Empresa</th>
            <th>Nome da Vaga</th>
            <th>Faixa Salarial</th>
            <th>Requisitos</th>
            <th>Escolaridade minima</th>
            <th></th>
          </tr>
          {vagas_ativas.map((vaga) => (
            <tr key={vaga.id}>
              <td>{vaga.empresa.first_name}</td>
              <td>{vaga.nome}</td>
              <td>{FAIXA_SALARIAL[vaga.faixa_salarial - 1].label}</td>
              <td>{vaga.requisitos}</td>
              <td>{ESCOLARIDADE_MINIMA[vaga.escolaridade_minima - 1].label}</td>
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
      </Table>

      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </section>
  );
};

export default PrivateCandidato;
