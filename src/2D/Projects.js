import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

class Projects extends Component {
  render() {
    const berlandPics = [
      "images/Pages_Aligned-600x500-Home-Top.png",
      "images/Pages_Aligned-600x500-Awareness.png",
      "images/Pages_Aligned-600x500-Research-Top.png",
      "images/Pages_Aligned-600x500-Show.png"
    ];
    const todaysPics = [
      "images/Today'sIPOs_Aligned-600x500-Todays.png",
      "images/Today'sIPOs_Aligned-600x500-TodaysZoom.png",
      "images/Today'sIPOs_Aligned-600x500-Upcoming.png",
      "images/Today'sIPOs_Aligned-600x500-About.png",
      "images/Today'sIPOs_Aligned-600x500-AboutZoom.png"
    ];
    return (
      <div>
        <Row style={{ marginTop: 230 }}>
          <Col
            className="shadow"
            style={{ width: 450, border: "1px solid lightGrey" }}
          >
            <Carousel
              interval={2000}
              controls={false}
              indicators={false}
              fade={true}
            >
              {berlandPics.map(imgSrc => (
                <Carousel.Item>
                  <img src={imgSrc} alt="" style={{ height: 375 }} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col
            className="shadow"
            style={{ width: 450, border: "1px solid lightGrey" }}
          >
            <Carousel
              interval={2000}
              controls={false}
              indicators={false}
              fade={true}
            >
              {todaysPics.map(imgSrc => (
                <Carousel.Item>
                  <img src={imgSrc} alt="" style={{ height: 375 }} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Projects;
