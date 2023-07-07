import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Table } from "react-bootstrap";
import { ESCOLARIDADE_MINIMA, FAIXA_SALARIAL } from "../utils/constants";
import useAxios from "../utils/useAxios";

const VagaInfo = () => {
  const [vaga, setVaga] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [escolaridade_minima, setEscolaridadeMinima] = useState(1);
  const [faixa_salarial, setFaixaSalarial] = useState(1);
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
        const id = queryParameters.get("id");
        const response = await api.get("/vagasInfo/" + id + "/");
        setVaga(response.data);
        setEscolaridadeMinima(response.data.escolaridade_minima);
        setFaixaSalarial(response.data.faixa_salarial);

        var cands = [];
        for (let i = 0; i < response.data.candidatos.length; i++) {
          const response2 = await api.get(
            "/candidatoInfo/" + response.data.candidatos[i] + "/"
          );
          cands.push(response2.data);
        }

        for (let i = 0; i < cands.length; i++) {
          const response3 = await api.get("/userInfo/" + cands[i].user + "/");
          cands[i].user = response3.data;
        }
        for (let i = 0; i < cands.length; i++) {
          let perfil_pts = 0;
          let pret = 0;
          if (cands[i].pretensao_salarial < 1000) {
            pret = 1;
          } else if (cands[i].pretensao_salarial < 2000) {
            pret = 2;
          } else if (cands[i].pretensao_salarial < 3000) {
            pret = 3;
          } else if (cands[i].pretensao_salarial > 3000) {
            pret = 4;
          }
          if (pret == response.data.faixa_salarial) {
            perfil_pts += 1;
          }
          if (cands[i].escolaridade >= response.data.escolaridade_minima) {
            perfil_pts += 1;
          }
          cands[i].perfil_pts = perfil_pts;
        }
        setCandidatos(cands);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <h1> {vaga.nome}</h1>

      <hr />
      <h2>Faixa Salarial</h2>
      <p>{FAIXA_SALARIAL[faixa_salarial - 1].label}</p>
      <h2>Requisitos</h2>
      <p>{vaga.requisitos}</p>
      <h2>Escolaridade Mínima</h2>
      <p>{ESCOLARIDADE_MINIMA[escolaridade_minima - 1].label}</p>
      <h2>Candidatos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Pretensão Salarial</th>
            <th>Escolaridade</th>
            <th>Experiência</th>
            <th>Pontos de perfil</th>
          </tr>
        </thead>
        <tbody>
          {candidatos?.map((cand) => (
            <tr key={cand.user.id}>
              <td>{cand.user.first_name}</td>
              <td>{cand.user.email}</td>
              <td>{cand.pretensao_salarial}</td>
              <td>{ESCOLARIDADE_MINIMA[cand.escolaridade - 1].label}</td>
              <td>{cand.experiencia}</td>
              <td>{cand.perfil_pts}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr />
      <Link to="/privateEmpresa">
        <button>Lista de vagas</button>
      </Link>

      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </section>
  );
};

export default VagaInfo;
