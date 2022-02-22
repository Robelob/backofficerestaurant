import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css";
// import striptags from "striptags"
const NewBlogPost = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [cover, setCover] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("Action");
  const [content, setContent] = useState("");
  const apiUrl = process.env.REACT_APP_BE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      category,
      title,
      price,
      cover,
      description,
      author: {
        name: authorName,
      },
      content: content,
    };
    try {
      const response = await fetch(`http://localhost:3003/blogpost`, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        handleBlogCoverUploads(data);
      } else {
        console.error("POST failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlogCoverUploads = async (data) => {
    const formData = new FormData();
    formData.append("cover", cover);
    try {
      const response = await fetch(
        `http://localhost:3003/blogpost/${data.id}/uploadSingleCover`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("good");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Food name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label> Image</Form.Label>
          <Form.Control
            type="file"
            size="lg"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Discription</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Discription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            size="lg"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default NewBlogPost;
