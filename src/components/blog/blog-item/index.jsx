import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BlogAuthor from "../blog-author";
import { Link } from "react-router-dom";
import "./styles.css";
export default class BlogItem extends Component {
  render() {
    const { food, email, comment, rate, id } = this.props;
    return (
      <Link to={`/blog/${id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Body>
            <Card.Title className="text-danger">{food}</Card.Title>
            <div>{comment}</div>
            <div>{rate}</div>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor {...email} />
          </Card.Footer>
        </Card>
      </Link>
    );
  }
}
// blog item
