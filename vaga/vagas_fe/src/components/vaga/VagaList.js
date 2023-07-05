import React, { Component } from "react";
import { Table } from "reactstrap";
import NewVagaModal from "./NewVagaModal";
import { FAIXA_SALARIAL, ESCOLARIDADE_MINIMA } from "../../constants";

// import ConfirmRemovalModal from "./ConfirmRemovalModal";

class VagaList extends Component {
  render() {
    const vagas = this.props.vagas;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Nome</th>
            <th>faixa salarial</th>
            <th>requisitos</th>
            <th>escolaridade minima</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!vagas || vagas.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>nenhuma vaga cadastrada</b>
              </td>
            </tr>
          ) : (
            vagas.map((vaga) => (
              <tr key={vaga.id}>
                <td>{vaga.nome}</td>
                <td>{FAIXA_SALARIAL[vaga.faixa_salarial - 1].label}</td>
                <td>{vaga.requisitos}</td>
                <td>
                  {ESCOLARIDADE_MINIMA[vaga.escolaridade_minima - 1].label}
                </td>
                <td align="center">
                  <NewVagaModal
                    create={false}
                    vaga={vaga}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  {/* <ConfirmRemovalModal
                    id={vaga.id}
                    resetState={this.props.resetState}
                  /> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default VagaList;
