import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import {
  API_URL_VAGAS,
  FAIXA_SALARIAL,
  ESCOLARIDADE_MINIMA,
} from "../../constants";

class NewVagaForm extends React.Component {
  state = {
    nome: "",
    faixa_salarial: "",
    requisitos: "",
    escolaridade_minima: "",
  };

  componentDidMount() {
    if (this.props.vaga) {
      const { nome, faixa_salarial, requisitos, escolaridade_minima } =
        this.props.vaga;
      this.setState({ nome, faixa_salarial, requisitos, escolaridade_minima });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createVaga = (e) => {
    e.preventDefault();
    axios.post(API_URL_VAGAS, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  // editStudent = (e) => {
  //   e.preventDefault();
  //   axios.put(API_URL_VAGAS + this.state.pk, this.state).then(() => {
  //     this.props.resetState();
  //     this.props.toggle();
  //   });
  // };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      // <Form onSubmit={this.props.vaga ? this.editVaga : this.createVaga}>
      <Form onSubmit={this.createVaga}>
        <FormGroup>
          <Label for="nome">Nome:</Label>
          <Input
            type="text"
            name="nome"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.nome)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="faixa_salarial">faixa_salarial:</Label>
          <select
            name="faixa_salarial"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.faixa_salarial)}
            id="faixa_salarial"
            class="form-control"
          >
            {FAIXA_SALARIAL.map((faixa_salarial) => (
              <option value={faixa_salarial.value}>
                {faixa_salarial.label}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <Label for="requisitos">requisitos:</Label>
          <Input
            type="text"
            name="requisitos"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.requisitos)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="escolaridade_minima">escolaridade minima:</Label>
          <select
            name="escolaridade_minima"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.escolaridade_minima)}
            id="escolaridade_minima"
            class="form-control"
          >
            {ESCOLARIDADE_MINIMA.map(
              (escolaridade_minima) => (
                console.log(escolaridade_minima.value),
                (
                  <option value={escolaridade_minima.value}>
                    {escolaridade_minima.label}
                  </option>
                )
              )
            )}
          </select>
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewVagaForm;
