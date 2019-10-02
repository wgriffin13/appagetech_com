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
    <Modal {...props} size="xl" centered closeButton>
      <Modal.Header
        style={{
          border: "1px solid #575757",
          // backgroundColor: "black",
          // color: "white",
          padding: 0,
          margin: 0
        }}
        closeButton
      >
        <Container style={{ alignItems: "center", marginBottom: 20, padding: 0 }}>
          <Row style={{ justifyContent: "center" }}>
            <Col md={4} sm={12}>
              <Row style={{ justifyContent: "center" }}>
                <Modal.Title
                  as={"h1"}
                  style={{
                    fontFamily: "co-headline, sans-serif",
                    fontWeight: 700,
                    fontStyle: "normal",
                    marginTop: 3
                  }}
                >
                  App Age
                </Modal.Title>
              </Row>
            </Col>
            <Col style={{ padding: 0, marginBottom: 0, marginTop: 0 }}>
              <Modal.Title
                as={"h5"}
                style={{
                  fontFamily: "co-headline, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  marginTop: 12,
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                toddberland.com
              </Modal.Title>
            </Col>
            <Col style={{ padding: 0, marginBottom: 0, marginTop: 0 }}>
              <Modal.Title
                as={"p"}
                style={{
                  fontFamily: "co-text, sans-serif",
                  fontWeight: 300,
                  fontStyle: "normal",
                  fontSize: 12,
                  marginTop: 12,
                  marginLeft: "auto",
                  marginRight: "auto",
                  ailgnItems: "center"
                }}
              >
                Launched August 2019
              </Modal.Title>
            </Col>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body style={{ border: "1px solid #575757" }}>
        <Container
          style={{
            fontSize: 16,
            marginTop: 12,
            justifyContent: "center",
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          <Col style={{ margin: 0, padding: 0 }}>
            <Row style={{ justifyContent: "center" }}>
              <Col sm={10} md={5}>
                <Image src={"images/iphoneShow.png"} fluid />
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: 25 }}>
              <Col sm={12} md={8}>
                <Image src={"images/HomePage.png"} fluid />
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: 12 }}>
              <h4>Challenge</h4>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: 20 }}>
              <p>
                Build a clean, modern, mobile-friendly site to engage patients, listeners, and people interested in his
                work.
              </p>
            </Row>

            <Row style={{ justifyContent: "center", marginBottom: 12 }}>
              <h4>Solution</h4>
            </Row>
            <Row style={{ marginBottom: 20, justifyContent: "center" }}>
              <Col xs={12} md={10}>
                <p style={{ textIndent: 40 }}>
                  From the ground up, we created a single page web app that showcases Dr. Berland's work and expertise.
                  We were inspired by his original content, so our design focused on highlighting this work. We
                  accomplished this through the creation of intuitive UI components, limiting of unnecessary visual
                  adornments, and frame based styling.
                </p>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: 12 }}>
              <h4>Features</h4>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: 20 }}>
              <ul>
                <li>Bespoke web design</li>
                <li>Single Page Application</li>
                <li>Twitter, Instagram, ResearchGate, Mapbox Integration</li>
              </ul>
            </Row>
          </Col>
        </Container>
      </Modal.Body>
      <Modal.Footer
        style={{
          border: "1px solid #575757",
          justifyContent: "center"
          // backgroundColor: "black",
          // color: "white"
        }}
      >
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
