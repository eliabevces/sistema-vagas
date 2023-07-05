import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../../constants";

class NewEmpresaForm extends React.Component {
  state = {
    email: "",
    first_name: "",
    password: "",
    password2: "",
  };

  componentDidMount() {
    if (this.props.empresa) {
      const { email, first_name, password, password2 } = this.props.empresa;
      this.setState({ email, first_name, password, password2 });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createempresa = (e) => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  // editEmpresa = (e) => {
  //   e.preventDefault();
  //   axios.put(API_URL + this.state.pk, this.state).then(() => {
  //     this.props.resetState();
  //     this.props.toggle();
  //   });
  // };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form
        onSubmit={this.props.empresa ? this.editEmpresa : this.createEmpresa}
      >
        <FormGroup>
          <Label for="first_name">Nome:</Label>
          <Input
            type="text"
            name="first_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.first_name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha:</Label>
          <Input
            type="password"
            name="password"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.password)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password2">Confirmar senha:</Label>
          <Input
            type="password"
            name="password2"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.password2)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewEmpresaForm;
