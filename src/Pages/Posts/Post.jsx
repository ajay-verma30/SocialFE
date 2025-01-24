import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Post.css";
import axios from "axios";

function Post() {
  const [fetchedposts, setFetchedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/post/allpost");
        setFetchedPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container className="post-container">
      {fetchedposts.length > 0 ? (
        fetchedposts.map((post, index) => (
          <Card key={index} className="mb-3">
            <Card.Header>
              <a
                href={`https://example.com/profile/${post.createdBy}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                {post.createdBy}
              </a>
            </Card.Header>
            <Card.Body>
            {post.postImage && post.postContext ? (
  <>
    <img
      src={post.postImage}
      alt="Post"
      className="uploaded-post"
    />
    <p>{post.postContext}</p>
  </>
) : post.postImage ? (
  <img
    src={post.postImage}
    alt="Post"
    className="uploaded-post"
  />
) : post.postContext ? (
  <p>{post.postContext}</p>
) : (
  <p>Image or Text not available</p>
)}
              <div className="mt-2 tags-block">
                {Array.isArray(post.postTags) && post.postTags.length > 0 ? (
                  post.postTags.map((tag, i) => (
                    <a
                      key={i}
                      href={`https://example.com/hashtag/${tag}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginRight: "10px",
                        color: "#007bff",
                        textDecoration: "none",
                      }}
                    >
                      {tag}
                    </a>
                  ))
                ) : (
                  <span>No tags available</span>
                )}
              </div>
            </Card.Body>
            <Card.Footer>
              <Row className="text-center">
                <Col xs={12}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="icons"
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </Container>
  );
}

export default Post;
