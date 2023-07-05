import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewVagaForm from "./NewVagaForm";

class NewVagaModal extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editando vaga";
    var button = <Button onClick={this.toggle}>Editar</Button>;
    if (create) {
      title = "Criando Nova vaga";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Criar novo
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewVagaForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              vaga={this.props.vaga}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewVagaModal;
