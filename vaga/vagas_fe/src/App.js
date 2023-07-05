import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/vaga/Home";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
}

export default App;
