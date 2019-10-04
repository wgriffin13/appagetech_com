import React, { Component } from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

class Client extends Component {
  render() {
    return (
      <div className="container-fluid">
        {/* <Row>
          <Col>Row 1 - first column</Col>
          <Col>Row 1 - second column</Col>
        </Row>
        <Row>
          <Col>Row 2 - first column</Col>
          <Col>Row 2 - second column</Col>
        </Row> */}
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User ID</Form.Label>
            <Form.Control type="email" placeholder="Enter User ID" />
            {/* <Form.Text className="text-muted">Client Section Coming Soon!</Form.Text> */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          {/* <Button variant="primary" type="submit">
            Submit
          </Button> */}
        </Form>
      </div>
    );
  }
}

export default Client;
