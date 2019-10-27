import React, { Component, Fragment } from "react";
import posed, { PoseGroup } from "react-pose";
import SplitText from "react-pose-text";

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 1000,
    transition: {
      y: { type: "spring", stiffness: 1000, damping: 15 },
      default: { duration: 1000 }
    }
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const Sidebar = posed.ul({
  open: {
    x: "0%",
    delayChildren: 20,
    staggerChildren: 200
  },
  closed: { x: "-500%", delay: 30 }
});

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 40, opacity: 0 }
});

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 100
  }
};

class About extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, isOpen: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isVisible: !this.state.isVisible
      });
    }, 300);
    setTimeout(this.toggle, 2300);
  }
  componentDidUpdate() {
    console.log("this.props", this.props);
    console.log("location", this.props.location);
    // if (this.props.location.pathname !== `/about`) {
    //   this.props.history.push(`/about`);
    // }
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const windowAspect = window.innerWidth / window.innerHeight;
    const marginTop = windowAspect > 1 ? 50 : 1200;
    const textSize = windowAspect > 1 ? 20 : 24;
    const lineSpace = windowAspect > 1 ? 2.3 : 1.8;
    const paddingX = windowAspect > 1 ? 50 : 0;
    const strongTextSize = windowAspect > 1 ? 36 : 36;

    const { isVisible, isOpen } = this.state;

    return (
      <Fragment>
        <PoseGroup>
          {isVisible && (
            // If animating more than one child, each needs a `key`

            <Modal
              key="modal"
              style={{
                width: "64vw",
                height: "90vh",
                marginTop: marginTop,
                paddingLeft: paddingX,
                paddingRight: paddingX,
                paddingTop: 0
              }}
            >
              <p
                className="lead"
                style={{
                  fontSize: textSize,
                  lineHeight: lineSpace,
                  textAlign: "justify",
                  marginBottom: 30
                }}
              >
                <span style={{ lineHeight: 1, fontSize: strongTextSize, fontWeight: 700, marginRight: 10 }}>
                  <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
                    App Age Technologies
                  </SplitText>
                </span>
                produces software that informs, entertains, solves problems and enriches lives. Co-founders William
                Griffin and Preston Chaplin bring unique and impressive professional experiences to this vanguard
                software development company. Decades of experience in digital imaging and high-profile advertising
                production provides assurance that your brand will be presented in the best possible light via App Age
                software. Extensive experience manipulating highly technical data for the financial industry and
                providing financial consulting for businesses big and small ensures that App Age can tackle complex
                technical challenges and advise clients of any size on the best paths to success. From microsites to
                distributed mobile apps, we’re software developers devoted to delivering success in surprising ways.
              </p>
              <div className="row justify-content-center">
                <div className="column">
                  <Sidebar
                    style={{
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      listStyle: "none"
                    }}
                    pose={isOpen ? "open" : "closed"}
                  >
                    <div className="row justify-content-center">
                      <div className="column mr-5">
                        <h3>Services</h3>
                        <div className="row justify-content-center">
                          <div className="column">
                            <Item className="item">Web Development</Item>
                            <Item className="item">iOS Development</Item>
                            <Item className="item">Android Development</Item>
                            <Item className="item">Tech Product Design</Item>
                            <Item className="item">Frontend Web Creation</Item>
                            <Item className="item">Backend Engineering</Item>
                            <Item className="item">Cloud services</Item>
                            <Item className="item">Process Automation</Item>
                            <Item className="item">Web Animations</Item>
                            <Item className="item">Interactive 3D Elements</Item>
                            <Item className="item">Computer Generated 3D Imaging</Item>
                            <Item className="item">Photo Retouching</Item>
                            <Item className="item">Photography</Item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Sidebar>
                </div>
                <div className="column">
                  <Sidebar
                    style={{
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      listStyle: "none"
                    }}
                    pose={isOpen ? "open" : "closed"}
                  >
                    <h3>Engagment Models</h3>

                    <Item className="item">Fixed Price Contract</Item>
                    <Item className="item">Hourly Development Work</Item>
                    <Item className="item">Equity Based Partnerships</Item>
                    <Item className="item">Project Specific Consulting</Item>
                  </Sidebar>
                </div>
              </div>
            </Modal>
          )}
        </PoseGroup>
      </Fragment>
    );
  }
}

export default About;
