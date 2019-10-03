import React, { Component } from "react";
import Row from "react-bootstrap/Row";
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
        <BerlandDetail show={this.state.showBerlandDetail} onHide={() => this.setState({ showBerlandDetail: false })} />
        <TodaysIposDetail
          show={this.state.showTodaysIposDetail}
          onHide={() => this.setState({ showTodaysIposDetail: false })}
        />
        <Row noGutters>
          <Col style={{ width: 480 }}>
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
                  <img src={imgSrc} alt="" style={{ height: 400 }} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          <Col className="shadow" style={{ width: 480, border: "1px solid lightGrey" }}>
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
