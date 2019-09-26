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
          We design software applications to breakthrough technological problems of our clients.  Our solutions overcome these problems as full-service products—technology pillars fully integrated in to the larger business.  From microsites to distributed mobile apps, we enjoy working on all types of problems.  Our clients come to us looking for creative, novel solutions.  And, our goal is to answer these problems in a way that surprises.
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
