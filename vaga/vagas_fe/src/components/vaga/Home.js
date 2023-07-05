import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import VagasList from "./VagaList";
import NewVagaModal from "./NewVagaModal";

import axios from "axios";

import { API_URL_VAGAS } from "../../constants";

class Home extends Component {
  state = {
    vagas: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getVagas = () => {
    axios.get(API_URL_VAGAS).then((res) => this.setState({ vagas: res.data }));
  };

  resetState = () => {
    this.getVagas();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <VagasList vagas={this.state.vagas} resetState={this.resetState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewVagaModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
