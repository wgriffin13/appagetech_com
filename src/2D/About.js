import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import { withStyles } from "@material-ui/styles";

// const styles = theme => ({
//   paragraph: {
//     textIndent: 40,
//     fontSize: 18
//     paddingLeft: 200,
//     paddingRight: 200
//   }
// });

// console.log(navigator.userAgent);
// console.log(document.documentMode);

class About extends Component {
  render() {
    const windowAspect = window.innerWidth / window.innerHeight;
    const marginTop = windowAspect > 1 ? 0 : 650;
    const textSize = windowAspect > 1 ? 20 : 24;
    const lineSpace = windowAspect > 1 ? 2 : 1.8;
    const paddingX = windowAspect > 1 ? 150 : 0;

    // const { classes } = this.props;

    return (
      // <Grid container>
      //   <Grid item>
      //     <Typography className={classes.paragraph}>
      //       App Age Technologies produces software that informs, entertains, solves problems and enriches lives.
      //       Co-founders William Griffin and Preston Chaplin bring unique and impressive professional experiences to this
      //       vanguard software development company. Decades of experience in digital imaging and high-profile advertising
      //       production provides assurance that your brand will be presented in the best possible light via App Age
      //       software. Extensive experience manipulating highly technical data for the financial industry and providing
      //       financial consulting for businesses big and small ensures that App Age can tackle complex technical
      //       challenges and advise clients of any size on the best paths to success. From microsites to distributed
      //       mobile apps, we’re software developers devoted to delivering success in surprising ways.
      //     </Typography>
      //   </Grid>
      // </Grid>
      <div class="container-fluid">
        <div className="row">
          <p
            style={{
              marginTop: marginTop,
              textIndent: 25,
              fontSize: textSize,
              lineHeight: lineSpace,
              textAlign: "justify",
              paddingLeft: paddingX,
              paddingRight: paddingX
            }}
          >
            <strong style={{ fontSize: 24, fontWeight: "bold" }}>App Age Technologies </strong> produces software that
            informs, entertains, solves problems and enriches lives. Co-founders William Griffin and Preston Chaplin
            bring unique and impressive professional experiences to this vanguard software development company. Decades
            of experience in digital imaging and high-profile advertising production provides assurance that your brand
            will be presented in the best possible light via App Age software. Extensive experience manipulating highly
            technical data for the financial industry and providing financial consulting for businesses big and small
            ensures that App Age can tackle complex technical challenges and advise clients of any size on the best
            paths to success. From microsites to distributed mobile apps, we’re software developers devoted to
            delivering success in surprising ways.
          </p>
          <ul class="list-group">
            <li class="list-group-item">Fixed Price Contracts</li>
            <li class="list-group-item">Hourly Development Work</li>
            <li class="list-group-item">Equity Based Partnerships</li>
            <li class="list-group-item">Project Specific Technology Consulting</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default About;
// export default withStyles(styles)(About);
