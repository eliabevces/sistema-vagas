import React, { Component } from "react";
import { Table } from "reactstrap";
import NewEmpresaModal from "./NewEmpresaModal";

// import ConfirmRemovalModal from "./ConfirmRemovalModal";

class EmpresaList extends Component {
  render() {
    const empresas = this.props.empresas;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!empresas || empresas.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>nenhuma empresa cadastrada</b>
              </td>
            </tr>
          ) : (
            empresas.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.first_name}</td>
                <td>{empresa.email}</td>
                <td align="center">
                  <NewEmpresaModal
                    create={false}
                    empresa={empresa}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  {/* <ConfirmRemovalModal
                    id={empresa.id}
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

export default EmpresaList;
