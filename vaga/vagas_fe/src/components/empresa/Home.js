import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import EmpresaList from "./EmpresaList";
import NewEmpresaModal from "./NewEmpresaModal";

import axios from "axios";

import { API_URL } from "../../constants";

class Home extends Component {
  state = {
    empresas: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getEmpresas = () => {
    axios.get(API_URL).then((res) => this.setState({ empresas: res.data }));
  };

  resetState = () => {
    this.getEmpresas();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <EmpresaList
              empresas={this.state.empresas}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewEmpresaModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
