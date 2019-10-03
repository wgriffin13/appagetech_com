import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import BerlandDetail from "./BerlandDetail";
import TodaysIposDetail from "./TodaysIposDetail";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBerlandDetail: false,
      showTodaysIposDetail: false
    };
  }

  onClickBerland = e => {
    e.preventDefault();
    console.log("Clicked Onclicked!!!", e);
    this.setState({ showBerlandDetail: true });
  };
  onClickTodaysIpos = e => {
    e.preventDefault();
    console.log("Clicked Onclicked!!!", e);
    this.setState({ showTodaysIposDetail: true });
  };

  onSelect = e => {};
  render() {
    const berlandPics = [
      "images/berlandAnimations/ScreenShots_Berland-width-525-1.png",
      "images/berlandAnimations/ScreenShots_Berland-width-525-2.png",
      "images/berlandAnimations/ScreenShots_Berland-width-525-3.png",
      "images/berlandAnimations/ScreenShots_Berland-width-525-4.png",
      "images/berlandAnimations/ScreenShots_Berland-width-525-5.png",
      "images/berlandAnimations/ScreenShots_Berland-width-525-6.png",
      "images/berlandAnimations/ScreenShots_Berland-width-525-7.png"
    ];

    const todaysPics = [
      "images/Today'sIPOs_Aligned-600x500-Todays.png",
      "images/Today'sIPOs_Aligned-600x500-TodaysZoom.png",
      "images/Today'sIPOs_Aligned-600x500-Upcoming.png",
      "images/Today'sIPOs_Aligned-600x500-About.png",
      "images/Today'sIPOs_Aligned-600x500-AboutZoom.png"
    ];

    const windowAspect = window.innerWidth / window.innerHeight;

    const variableWidth = windowAspect > 1 ? 525 : 420;

    const variableMarginTop = windowAspect > 1 ? 100 : 240;

    return (
      <div>
        <BerlandDetail show={this.state.showBerlandDetail} onHide={() => this.setState({ showBerlandDetail: false })} />
        <TodaysIposDetail
          show={this.state.showTodaysIposDetail}
          onHide={() => this.setState({ showTodaysIposDetail: false })}
        />
        <Container style={{ marginTop: variableMarginTop }}>
          <Row className="justify-content-center">
            <Col md={6} style={{ width: variableWidth }}>
              <Carousel
                pauseOnHover={false}
                interval={1500}
                controls={false}
                indicators={false}
                fade={true}
                className="shadow"
                onClick={this.onClickBerland}
              >
                {berlandPics.map(imgSrc => (
                  <Carousel.Item key={imgSrc}>
                    <img src={imgSrc} alt="" style={{ width: variableWidth }} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col md={6} style={{ width: variableWidth }}>
              <Carousel
                pauseOnHover={false}
                interval={1500}
                controls={false}
                indicators={false}
                fade={true}
                className="shadow"
                onClick={this.onClickTodaysIpos}
              >
                {todaysPics.map(imgSrc => (
                  <Carousel.Item key={imgSrc}>
                    <img src={imgSrc} alt="" style={{ width: variableWidth }} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Projects;
