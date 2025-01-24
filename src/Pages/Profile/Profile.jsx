import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useUser } from "../../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Profile() {
  const { user, logout } = useUser();
  const [mypost, setMyPost] = useState([]);

  // Fetch user's posts
  useEffect(() => {
    const myPostFetch = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3001/users/mypost/${user.decoded.username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setMyPost(result.data);
        console.log(mypost);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    myPostFetch();
  }, [user.decoded.username, user.token]);

  const handleLogout = () =>{
    logout();
  }

  return (
    <>
      {/* Banner */}
      <Row className="banner"></Row>

      {/* Profile Information */}
      <Container>
        <Row>
          <Card className="profile-image-card">
            {user?.decoded?.profileImage ? (
              <img
                src={user.decoded.profileImage}
                alt="profile-image"
                className="profile-image"
              />
            ) : (
              <FontAwesomeIcon icon={faImage} />
            )}
          </Card>
        </Row>
        <Row className="profile-detail">
          <h4 className="text-center">@{user.decoded.username}</h4>
          <Button type="submit" className="logoutBtn" onClick={handleLogout}>Logout</Button>
        </Row>
      </Container>

      {/* User's Posts */}
      <Container>
        <Row className="g-4">
          {mypost.length > 0 ? (
            mypost.map((post, index) => (
              <Col key={index} xs={12} sm={6} lg={3}>
        <Card className="custom-card">
          <Card.Body>
            {post.postImage ? (
              <img
                src={post.postImage}
                alt="Post"
                className="uploaded-post"
              />
            ) : (
              <p>No image available</p>
            )}
          </Card.Body>
          <Card.Footer>
            {post.postContext ? (
              <p className="text-center">{post.postContext}</p>
            ) : (
              <p className="text-center">No context available</p>
            )}
          </Card.Footer>
        </Card>
      </Col>
            ))
          ) : (
            <p className="text-center">No posts to display.</p>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Profile;
