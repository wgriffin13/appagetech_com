import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
// const berlandPics = [
//   "images/Pages_Aligned-600x500-Home-Top.png",
//   "images/Pages_Aligned-600x500-Awareness.png",
//   "images/Pages_Aligned-600x500-Research-Top.png",
//   "images/Pages_Aligned-600x500-Show.png"
// ];
class Projects extends Component {
  render() {
    return (
      <div className="container">
        <Row className="justify-content-center">
          <Col>
            <Carousel interval={2000} controls={false}>
              <Carousel.item>
                <img
                  className="d-block w-100"
                  src="images/Pages_Aligned-600x500-Home-Top.png"
                  alt=""
                />
              </Carousel.item>
              <Carousel.item>
                <img
                  className="d-block w-100"
                  src="images/Pages_Aligned-600x500-Awareness.png"
                  alt=""
                />
              </Carousel.item>
              <Carousel.item>
                <img
                  className="d-block w-100"
                  src="images/Pages_Aligned-600x500-Research-Top.png"
                  alt=""
                />
              </Carousel.item>
              <Carousel.item>
                <img
                  className="d-block w-100"
                  src="images/Pages_Aligned-600x500-Show.png"
                  alt=""
                />
              </Carousel.item>
            </Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Projects;


import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

class Projects extends Component {
  render() {
    return (
      <div className="container">
        <Row className="justify-content-center">
          <Col>
            <Carousel interval={2000} controls={false}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/Pages_Aligned-600x500-Home-Top.png"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/Pages_Aligned-600x500-Awareness.png"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/Pages_Aligned-600x500-Research-Top.png"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/Pages_Aligned-600x500-Show.png"
                  alt=""
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Projects;
