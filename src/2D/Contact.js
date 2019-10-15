import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./contact.css";
import ContactForm from './ContactForm';

class Contact extends Component {
  render() {
    const windowAspect = window.innerWidth / window.innerHeight;
    const marginTop = windowAspect > 1 ? 0 : 150;
    return (
      <div className="container" style={{ marginTop: marginTop }}>
        <Row>
          <Col className="align-items-center" style={{ marginX: 0, marginBottom: 10 }}>
            <Row className="mb-1">
              <Image src="images/Will_SlackProfilePic.jpg" roundedCircle></Image>
            </Row>
            <Row>
              <h4>William Griffin</h4>
            </Row>
            <Row>
              <i>Los Angeles, California</i>
            </Row>
            <Row>
              <a href={`mailto:william@appagetech.com`}>william@appagetech.com</a>
            </Row>
          </Col>

          <Col className="align-items-center" style={{ marginX: 0, marginBottom: 10 }}>
            <Row className="mb-1">
              <Image src="images/Preston_BW_profilePic.jpg" roundedCircle></Image>
            </Row>
            <Row>
              <h4>Preston Chaplin</h4>
            </Row>
            <Row>
              <i>New York, New York</i>
            </Row>
            <Row>
              <a href={`mailto:preston@appagetech.com`}>preston@appagetech.com</a>
            </Row>
          </Col>
          <div className="w-100"></div>
          <Col className="d-flex flex-row">
            <ContactForm toggleLockNavigation={this.props.toggleLockNavigation} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Contact;
