import React, { Component } from "react";

class About extends Component {
  render() {
    const windowAspect = window.innerWidth / window.innerHeight;
    const marginTop = windowAspect > 1 ? 700 : 650;
    const textSize = windowAspect > 1 ? 20 : 24;
    const lineSpace = windowAspect > 1 ? 2 : 1.8;
    const paddingX = windowAspect > 1 ? 150 : 0;

    return (
      <div class="container d-xm-flex">
        <div
          class="column"
          style={{
            marginTop: marginTop,
            paddingLeft: paddingX,
            paddingRight: paddingX
            // backgroundColor: "red"
          }}
        >
          <div class="row justify-content-center">
            <div class="jumbotron" style={{ backgroundColor: "white" }}>
              {/* <h1 class="display-4">Hello, world!</h1> */}
              <p
                class="lead"
                style={{
                  textIndent: 25,
                  fontSize: textSize,
                  lineHeight: lineSpace,
                  textAlign: "justify"
                }}
              >
                <strong style={{ fontSize: 24, fontWeight: "bold" }}>App Age Technologies </strong> produces software
                that informs, entertains, solves problems and enriches lives. Co-founders William Griffin and Preston
                Chaplin bring unique and impressive professional experiences to this vanguard software development
                company. Decades of experience in digital imaging and high-profile advertising production provides
                assurance that your brand will be presented in the best possible light via App Age software. Extensive
                experience manipulating highly technical data for the financial industry and providing financial
                consulting for businesses big and small ensures that App Age can tackle complex technical challenges and
                advise clients of any size on the best paths to success. From microsites to distributed mobile apps,
                we’re software developers devoted to delivering success in surprising ways.
              </p>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="jumbotron" style={{ backgroundColor: "white" }}>
              <div class="row justify-content-center">
                <div class="column">
                  <p class="display-4">App Age Services</p>
                  <p>Web Development</p>
                  <p>Tech Product Design</p>
                  <p>iOS Development</p>
                  <p>Andriod Development</p>
                  <p>Frontend Web Creation</p>
                  <p>Backend Engineering (cloud services)</p>
                  <p>Process Automation</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="jumbotron" style={{ backgroundColor: "white" }}>
              <div class="row justify-content-center">
                <div class="column">
                  <p class="display-4">Engagement Models</p>
                  <p>Fixed Price Contract</p>
                  <p>Hourly Development Work</p>
                  <p>Equity Based Partnerships</p>
                  <p>Project Specific Technology Consulting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
