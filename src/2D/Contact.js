import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Contact extends Component {
  render() {
    return(
    <Container>
        <Row>
          <Col>
            <h4>William Griffin</h4>
            <i>Los Angeles, California</i>
            <a href={`mailto: william@appagetech.com`}>william@appagetech.com</a>
            <a href={`tel:949-632-3021`}>(949)632-3021 </a>
          </Col>
          <Col>
            <h4>Preston Chaplin</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Contact;
