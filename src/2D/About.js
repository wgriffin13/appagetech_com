import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class About extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>About</h1>
            <h4>About</h4>
            <h6>About</h6>
            <button>html button</button>
            <Button variant="primary">BootStrap Primary</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
