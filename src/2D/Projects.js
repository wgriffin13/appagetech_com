import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import ProjectDetail from "./ProjectDetail";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      setShowDetail: false
    };
  }

  onClick = e => {
    e.preventDefault();
    console.log("Clicked Onclicked!!!");
    this.setState({ showDetail: true });
  };

  onSelect = e => {};
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
        <Row noGutters>
          <Col style={{ width: 480 }}>
            <Carousel
              pauseOnHover={false}
              interval={1500}
              controls={false}
              indicators={false}
              fade={true}
              className="shadow"
              onClick={this.onClick}
            >
              {berlandPics.map(imgSrc => (
                <Carousel.Item>
                  <img src={imgSrc} alt="" style={{ height: 400 }} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <ProjectDetail show={this.state.showDetail} onHide={() => this.setState({ showDetail: false })} />

          <Col className="shadow" style={{ width: 480, border: "1px solid lightGrey" }}>
            <Carousel interval={1000} controls={false} indicators={false} fade={true}>
              {todaysPics.map(imgSrc => (
                <Carousel.Item>
                  <img src={imgSrc} alt="" style={{ height: 400 }} />
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
