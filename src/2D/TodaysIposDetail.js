import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

export default function TodaysIpos(props) {
  const screenShotAnimation = [
    "images/todaysIposAnimation/ScreenShots_TodaysIpos_700px-1.png",
    "images/todaysIposAnimation/ScreenShots_TodaysIpos_700px-2.png",
    "images/todaysIposAnimation/ScreenShots_TodaysIpos_700px-3.png",
    "images/todaysIposAnimation/ScreenShots_TodaysIpos_700px-4.png",
    "images/todaysIposAnimation/ScreenShots_TodaysIpos_700px-5.png"
  ];
  const iphoneAnimation = [
    "images/todaysIposAnimation/IphoneTodaysIpos-2.png",
    "images/todaysIposAnimation/IphoneTodaysIpos-3.png",
    "images/todaysIposAnimation/IphoneTodaysIpos-4.png",
    "images/todaysIposAnimation/IphoneTodaysIpos-5.png"
  ];

  const windowAspect = window.innerWidth / window.innerHeight;

  return (
    <Modal {...props} size="xl" centered closeButton>
      <Modal.Header
        style={{
          border: "1px solid #575757",
          backgroundColor: "black",
          color: "white",
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
                as={"h4"}
                style={{
                  fontFamily: "mrs-eaves-xl-serif, serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  marginTop: 12,
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                todaysipos.com
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
                Launched September 2019
              </Modal.Title>
            </Col>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body style={{ border: "1px solid #575757" }}>
        <Container
          style={{
            fontSize: 16,
            padding: 0,
            margin: 0,
            justifyContent: "center"
          }}
        >
          <Col>
            <Row className="justify-content-center mb-5">
              <Col sm={8} md={4}>
                <Carousel
                  as={"container"}
                  pauseOnHover={false}
                  interval={1500}
                  controls={true}
                  indicators={true}
                  fade={true}
                >
                  {iphoneAnimation.map(imgSrc => (
                    <Carousel.Item key={imgSrc}>
                      <img src={imgSrc} alt="" style={{ width: 300 }} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
            <Row className="justify-content-center mb-5">
              <Col xs={12} md={8}>
                <Carousel
                  // as={"container"}
                  pauseOnHover={false}
                  interval={1500}
                  controls={true}
                  indicators={true}
                  fade={true}
                >
                  {screenShotAnimation.map(imgSrc => (
                    <Carousel.Item key={imgSrc}>
                      {windowAspect > 1 ? (
                        <img src={imgSrc} alt="" style={{ width: 700 }} /> //web
                      ) : (
                        <img src={imgSrc} alt="" style={{ width: 300 }} /> //mobile
                      )}
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
            <Row
              style={{
                justifyContent: "center",
                marginBottom: 12
              }}
            >
              <h4>Challenge</h4>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: 20 }}>
              <p>Provide a user friendly tool to view and explore in depth financial data of companies going public.</p>
            </Row>

            <Row
              style={{
                justifyContent: "center",
                marginBottom: 12
              }}
            >
              <h4>Solution</h4>
            </Row>
            <Row style={{ marginBottom: 20, justifyContent: "center" }}>
              <Col xs={12} md={10}>
                <p style={{ textIndent: 40 }}>
                  Designed and built a robust fullstack web application. Using a dashboard as our main design component,
                  we curated the companies’ financial data to expand with the user at each level of exploration. For
                  data magangent, we created a backend service to gather, process, and store initial public offering
                  (IPO) data. The frontend and backend services run independently using modern scalability technology to
                  allow the application to grow with demand.
                </p>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: 12 }}>
              <h4>Features</h4>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: 20 }}>
              <ul>
                <li>Dashboard creation</li>
                <li>API connectivity with data management and process scheduling</li>
                <li>Logo design, typography, and color selection</li>
                <li>CI / CD pipelines</li>
                <li>Highly available web app (multi-node, load balancing)</li>
              </ul>
            </Row>
          </Col>
        </Container>
      </Modal.Body>
      <Modal.Footer
        style={{
          border: "1px solid #575757",
          justifyContent: "center",
          backgroundColor: "black",
          color: "white"
        }}
      >
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
