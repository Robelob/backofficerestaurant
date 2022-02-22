import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
export default class BlogAuthor extends Component {
  render() {
    return (
      <Row>
        <Col xs={2}>
          <h1>{this.props.email}</h1>
        </Col>
      </Row>
    );
  }
}
// blog author
