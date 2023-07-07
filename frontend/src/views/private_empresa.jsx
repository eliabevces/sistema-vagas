import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import useAxios from "../utils/useAxios";
import Table from "react-bootstrap/Table";
import { ESCOLARIDADE_MINIMA, FAIXA_SALARIAL } from "../utils/constants";

const PrivateEmpresa = () => {
  const isEmpresaLoggedIn = useAuthStore((state) => state.isEmpresaLoggedIn);
  const [vagas_ativas, setVagasAtivas] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpresaLoggedIn()) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await api.get("/vagas/");
        setVagasAtivas(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const deleteVaga = async (id) => {
    try {
      await api.delete(`vagas`, { data: { id } });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Nome da Vaga</th>
            <th>Faixa Salarial</th>
            <th>Requisitos</th>
            <th>Escolaridade minima</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vagas_ativas.map((vaga) => (
            <tr key={vaga.id}>
              <td>
                <Link to={"/vagaInfo?id=" + vaga.id}>
                  <button>Info</button>
                </Link>
              </td>
              <td>{vaga.nome}</td>
              <td>{FAIXA_SALARIAL[vaga.faixa_salarial - 1].label}</td>
              <td>{vaga.requisitos}</td>
              <td>{ESCOLARIDADE_MINIMA[vaga.escolaridade_minima - 1].label}</td>
              <td>
                <Link
                  to={
                    "/editVaga?id=" +
                    vaga.id +
                    "&nome=" +
                    vaga.nome +
                    "&faixa_salarial=" +
                    vaga.faixa_salarial +
                    "&requisitos=" +
                    vaga.requisitos +
                    "&escolaridade_minima=" +
                    vaga.escolaridade_minima
                  }
                >
                  <button>Editar</button>
                </Link>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteVaga(vaga.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/newVaga">
        <button>Nova vaga</button>
      </Link>

      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </section>
  );
};

export default PrivateEmpresa;
