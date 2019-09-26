import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class About extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="justify-content-center">
       <Col xs={10} className="align-items-center">
         <Row className="mb-5">
          {/* <h1>What We Do</h1> */}
          </Row>
          <Row >
          <strong style={{ textIndent: 25, fontSize: 24}}>
          We design applications to solve technological problems.  Solutions are based in process automation, data democracy, and web presence expansion.  From microsites to distributed mobile apps, we enjoy working with individuals looking for creative, unique solutions.  Our goal is to answer their problem in a way that surprises you.
          </strong>
          </Row>
          {/* <h3>Who We Are</h3>
          <p>Preston Chaplin, Co-Founder…</p>
          <p>William Griffin, Co-Founder…</p> */}
          </Col>
          </Row>
      </div>
    );
  }
}

export default About;
