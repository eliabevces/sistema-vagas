import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import useAxios from "../utils/useAxios";

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
      <table>
        <tbody>
          {vagas_ativas.map((vaga) => (
            <tr key={vaga.id}>
              <td>{vaga.nome}</td>
              <td>{vaga.faixa_salarial}</td>
              <td>{vaga.requisitos}</td>
              <td>{vaga.escolaridade_minima}</td>
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
      </table>

      <Link to="/newVaga">
        <button>Criar vaga</button>
      </Link>

      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </section>
  );
};

export default PrivateEmpresa;
