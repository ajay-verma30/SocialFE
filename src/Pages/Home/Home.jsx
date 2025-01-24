import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "../../Components/Navigation/NavigationBar";
import axios from "axios";
import Post from "../Posts/Post";

function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [context, setContext] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For image preview
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To display error messages

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);

  const handleImageUpload = () => {
    document.getElementById("file-input").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl); // Set the preview URL
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const tagsArray = tags.split(",").map((tag) => tag.trim());
    const formData = new FormData();
    formData.append("postImage", selectedImage);
    formData.append("postContext", context); 
    formData.append("postTags", JSON.stringify(tagsArray)); 
    formData.append("createdBy", user.decoded.username);

    try {
      const result = await axios.post("http://localhost:3001/post/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      resetForm();
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error uploading post:", error);
      setError("Failed to create the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setContext("");
    setSelectedImage(null);
    setTags("");
    setPreviewUrl(null); // Clear preview
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <div className="posts-container">
          <Form>
            <Button onClick={handleShow}>Create Post</Button>
          </Form>
        </div>
      </Container>
      <Post />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creating a Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmission}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Add Image</Form.Label>
              <br />
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <FontAwesomeIcon
                icon={faPaperclip}
                className="image-add-btn"
                onClick={handleImageUpload}
                style={{ fontSize: "30px", cursor: "pointer", color: "#007bff" }}
              />
              {previewUrl && (
                <div style={{ marginTop: "20px" }}>
                  <p>Preview:</p>
                  <img
                    src={previewUrl}
                    alt="Uploaded Preview"
                    style={{ width: "300px", height: "auto", borderRadius: "10px" }}
                    onLoad={() => URL.revokeObjectURL(previewUrl)} // Revoke Object URL
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Context</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hashtags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add tags here..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </Form.Group>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              CLOSE
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "ADD POST"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Home;
