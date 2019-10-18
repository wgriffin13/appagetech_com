import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class About extends Component {
  render() {
    const windowAspect = window.innerWidth / window.innerHeight;
    const marginTop = windowAspect > 1 ? 0 : 110;
    const padding = windowAspect > 1 ? 0 : null;

    return (
      <div className="container" style={{ marginTop: marginTop, padding: padding }}>
        <Row className="justify-content-center" style={{ margin: 0 }}>
          <Col className="align-items-center" style={{ margin: 0 }}>
            <Row>
              <p style={{ textIndent: 25, fontSize: 20, lineHeight: 2 }} class="lead">
                <strong>App Age Technologies</strong> produces software that entertains, informs, solves problems and
                enriches lives. Co-founders William Griffin and Preston Chaplin bring unique and impressive professional
                experiences to this vanguard software development company. Decades of experience in digital imaging and
                high-profile advertising production provides assurance that your brand will be presented in the best
                possible light via App Age software. Extensive experience manipulating highly technical data for the
                financial industry and providing financial consulting for businesses big and small ensures that App Age
                can tackle complex technical challenges and advise clients of any size on the best paths to success.
                From microsites to distributed mobile apps, we’re software developers devoted to delivering success in
                surprising ways.
              </p>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
