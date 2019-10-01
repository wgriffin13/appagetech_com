import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

export default function ProjectDetail(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row>
          <Col style={{ padding: 0 }}>
            <h4>App Age project:</h4>
          </Col>
          <Col style={{ padding: 0, margin: 0 }}>
            <h4>Dr. Todd Berland</h4>
          </Col>
        </Row>
        <h4>Challenge:</h4>
        <p>
          Build a clean, modern, mobile-friendly site to engage patients, listeners, and people interested in his work.
        </p>
        <Image src={"images/showMobile.png"} style={{ height: 460 }} fluid />
        <Image src={"images/HomePage.png"} style={{ height: 460 }} fluid />

        <h4>Solution:</h4>
        <p>
          From the ground up, we created a single page web app that showcases Dr. Berland's work and expertise. We were
          inspired by his original content, so our design focused on highlighting this work. We accomplished this
          through the creation of intuitive UI components, limiting of unnecessary visual adornments, and frame based
          styling.
        </p>
        <h4>Features:</h4>
        <ul>
          <li>Bespoke web design</li>
          <li>Single Page Application</li>
          <li>Twitter, Instagram, ResearchGate, Mapbox Integration</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
