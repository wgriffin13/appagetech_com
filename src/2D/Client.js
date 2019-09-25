import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Client extends Component {
  render() {
    return (
      <div class="container-fluid">
        <Row>
          <Col>Row 1 - first column</Col>
          <Col>Row 1 - second column</Col>
        </Row>
        <Row>
          <Col>Row 2 - first column</Col>
          <Col>Row 2 - second column</Col>
        </Row>
      </div>
    );
  }
}

export default Client;
