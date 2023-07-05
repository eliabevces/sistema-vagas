import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="./vagas-logo.png"
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
          alt="Vagas Logo"
        />
      </div>
    );
  }
}

export default Header;
