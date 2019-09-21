import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class About extends Component {
  constructor() {
    super();
    this.state = {
      showComment: false
    };
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>h1: About</h1>
            <h4>h4: About</h4>
            <h6>h6: About</h6>
            <button>html button</button>
            <Button
              variant="primary"
              onClick={() => this.setState({ showComment: true })}
            >
              BootStrap Primary
            </Button>
            {this.state.showComment ? <h1>Button Triggered!!!</h1> : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
