import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import "./modalStyle.css";

export default function ProjectDetail(props) {
  return (
    <Modal {...props} size="xl" centered>
      <Modal.Header
        style={{
          border: "1px solid #575757"
        }}
        closeButton
      >
        <Container style={{ justifyContent: "center" }}>
          <Modal.Title
            style={{
              justifyContent: "center",
              fontFamily: "co-headline, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              marginRight: 15
            }}
          >
            App Age Project:
          </Modal.Title>
          <Modal.Title
            style={{
              justifyContent: "center",
              fontFamily: "co-headline, sans-serif",
              fontWeight: 400,
              fontStyle: "normal"
            }}
          >
            www.toddberland.com
          </Modal.Title>
        </Container>
      </Modal.Header>
      <Modal.Body style={{ border: "1px solid #575757" }}>
        <Container style={{ justifyContent: "center" }}>
          <Col style={{ margin: 0 }}>
            <Row style={{ justifyContent: "center" }}>
              <h4>Challenge:</h4>
            </Row>
            <Row>
              <p>
                Build a clean, modern, mobile-friendly site to engage patients, listeners, and people interested in his
                work.
              </p>
            </Row>
            <Row>
              <Col xs={4}>
                <Image src={"images/iphoneShow.png"} fluid />
              </Col>
              <Col xs={8}>
                <Image src={"images/HomePage.png"} fluid />
              </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <h4>Solution:</h4>
            </Row>
            <Row>
              <p>
                From the ground up, we created a single page web app that showcases Dr. Berland's work and expertise. We
                were inspired by his original content, so our design focused on highlighting this work. We accomplished
                this through the creation of intuitive UI components, limiting of unnecessary visual adornments, and
                frame based styling.
              </p>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <h4>Features:</h4>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <ul>
                <li>Bespoke web design</li>
                <li>Single Page Application</li>
                <li>Twitter, Instagram, ResearchGate, Mapbox Integration</li>
              </ul>
            </Row>
          </Col>
        </Container>
      </Modal.Body>
      <Modal.Footer style={{ border: "1px solid #575757" }}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
