import React, { Component } from "react";
import Form from "react-bootstrap/Form";

const windowAspect = window.innerWidth / window.innerHeight;
const variableMarginTop = windowAspect > 1 ? -300 : 240;

class Client extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: variableMarginTop }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User ID</Form.Label>
            <Form.Control type="email" placeholder="Enter User ID" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Client;
