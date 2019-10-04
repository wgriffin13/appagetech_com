import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class About extends Component {
  render() {
    const windowAspect = window.innerWidth / window.innerHeight;
    const marginTop = windowAspect > 1 ? 0 : 150;

    return (
      <div className="container" style={{ marginTop: marginTop }}>
        <Row className="justify-content-center" style={{ margin: 0 }}>
          <Col className="align-items-center" style={{ margin: 0 }}>
            <Row className="mb-5"></Row>
            <Row>
              <strong style={{ textIndent: 25, fontSize: 24 }}>
                We design software applications to breakthrough technological problems of our clients. Our solutions
                overcome these problems as full-service products—technology pillars fully integrated in to the larger
                business. From microsites to distributed mobile apps, we enjoy working on all types of problems. Our
                clients come to us looking for creative, novel solutions. And, our goal is to answer these problems in a
                way that surprises.
              </strong>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
