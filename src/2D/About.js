import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    this.aboutRef = React.createRef();
  }
  render() {
    return (
      <div ref={this.aboutRef}>
        <h1>TEST 1-2-3 !!!</h1>
      </div>
    );
  }
}

export default About;
