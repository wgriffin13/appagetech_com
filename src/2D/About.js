import React, { Component, Fragment } from "react";

class About extends Component {
  render() {
    const windowAspect = window.innerWidth / window.innerHeight;
    const marginTop = windowAspect > 1 ? 500 : 650;
    const textSize = windowAspect > 1 ? 20 : 24;
    const lineSpace = windowAspect > 1 ? 2 : 1.8;
    const paddingX = windowAspect > 1 ? 150 : 0;

    return (
      <Fragment>
        {/* <div
          style={{
            height: "500px",
            width: "100%",
            background: "red",
            // background: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0))",
            position: "sticky",
            top: 0,
            zIndex: 100
          }}
        ></div> */}

        <div class="container d-flex">
          <div
            class="column"
            style={{
              marginTop: marginTop,
              paddingLeft: paddingX,
              paddingRight: paddingX
            }}
          >
            <div class="row justify-content-center">
              <div class="jumbotron-fluid" style={{ backgroundColor: "white" }}>
                <p
                  class="lead"
                  style={{
                    textIndent: 25,
                    fontSize: textSize,
                    lineHeight: lineSpace,
                    textAlign: "justify",
                    marginBottom: 50
                  }}
                >
                  <strong style={{ fontSize: 42 }}>App Age Technologies </strong> produces software that informs,
                  entertains, solves problems and enriches lives. Co-founders William Griffin and Preston Chaplin bring
                  unique and impressive professional experiences to this vanguard software development company. Decades
                  of experience in digital imaging and high-profile advertising production provides assurance that your
                  brand will be presented in the best possible light via App Age software. Extensive experience
                  manipulating highly technical data for the financial industry and providing financial consulting for
                  businesses big and small ensures that App Age can tackle complex technical challenges and advise
                  clients of any size on the best paths to success. From microsites to distributed mobile apps, we’re
                  software developers devoted to delivering success in surprising ways.
                </p>
              </div>
            </div>

            <div class="row justify-content-center" style={{ textSize: textSize, marginBottom: 50 }}>
              <div class="jumbotron-fluid">
                <div class="row justify-content-center">
                  <div class="column">
                    <div class="row justify-content-center">
                      <h2 class="display-4 my-3">App Age Services</h2>
                    </div>
                    <div class="dropdown-divider mb-4"></div>
                    <div
                      class="row lead"
                      style={{
                        fontSize: textSize
                      }}
                    >
                      <div class="column mr-5">
                        <p>Web Development</p>
                        <p>Tech Product Design</p>
                        <p>iOS Development</p>
                        <p>Android Development</p>
                        <p>Frontend Web Creation</p>
                        <p>Backend Engineering </p>
                        <p>Cloud services</p>
                      </div>
                      <div class="column">
                        <p>Process Automation</p>
                        <p>Web Animations</p>
                        <p>Interactive 3D Elements</p>
                        <p>Computer Generated 3D Imaging</p>
                        <p>Expert Photo Retouching</p>
                        <p>Still Photography</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-center" style={{ textSize: textSize }}>
              <div class="jumbotron-fluid">
                <div class="row justify-content-center lead">
                  <div class="column">
                    <p class="display-4 my-3">Engagement Models</p>
                    <div class="dropdown-divider mb-4"></div>
                    <p>Fixed Price Contract</p>
                    <p>Hourly Development Work</p>
                    <p>Equity Based Partnerships</p>
                    <p>Project Specific Consulting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default About;
