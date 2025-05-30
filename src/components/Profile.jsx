import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import "../components/styles/Profile.css";

const Profile = () => {

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEditableEmployee, setEditableEmployee] = useState(false);
  const [isEditableUser, setEditableUser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const employeeRef = useRef(null);
  const userRef = useRef(null);
  const imageRef = useRef(null);
  const imageTextRef = useRef(null);
  const inputFileRef = useRef(null);

  const handleImageClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      imageRef.current.src = localUrl;
    }
  };

  const handleIsHovered = () => {
    setIsHovered((prev) => {
      const newHovered = !prev;
      if (imageRef.current) {
        imageRef.current.style.filter = newHovered ? "brightness(50%)" : "brightness(100%)";
        imageTextRef.current.style.display = newHovered ? "block" : "none";
      }
      return newHovered;
    });
  };
  const handleEditEmployeeClick = () => {
    if (isEditableEmployee) {
      setEditableEmployee(false);
      employeeRef.current.style.backgroundColor = '#0d6efd';
      return;
    }
    setEditableEmployee(true);
    employeeRef.current.style.backgroundColor = 'green'
  };

  const handleEditUserClick = () => {
    if (isEditableUser) {
      setEditableUser(false);
      userRef.current.style.backgroundColor = '#0d6efd';
      return;
    }
    setEditableUser(true);
    userRef.current.style.backgroundColor = 'green';
  };

  const [userData, setUserData] = useState({
    username: "",
    firstname: "",
    secondName: "",
    phoneNumber: "",
    surname: "",
    email: "",
    role: "",

  });


  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/organizationuser/user', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        setUserData({
          username: response.data.username,
          firstname: response.data.firstname,
          surname: response.data.surname,
          email: response.data.email,
          role: response.data.role,
        });

      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load user');
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <Row>
        <Col md={3} className="my-4 ms-3 me-3 p-4 border rounded shadow-sm">
          <div className="position-relative mx-auto">
            <Image
              src="https://randomuser.me/api/portraits/men/75.jpg"
              rounded
              fluid
              width={250}
              height={300}
              ref={imageRef}
              className="d-block mx-auto border rounded shadow-sm"
              onMouseEnter={handleIsHovered}
              onMouseLeave={handleIsHovered}
              onClick={handleImageClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={inputFileRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div ref={imageTextRef} id="change-image-center"
              onMouseEnter={handleIsHovered}
              onMouseLeave={handleIsHovered}
              onClick={handleImageClick}>
              Zmien obraz
            </div>
          </div>

          <div className="mt-3 ms-5">
            <strong>Name:</strong> {userData.firstname + " " + userData.surname}<br />
            <strong>Department:</strong> Inception<br />
            <strong>System role:</strong> {userData.role}<br />
            <strong>Email:</strong> {userData.email}<br />
            <strong>Phone number:</strong> {userData.phoneNumber}<br />
            <strong>Role:</strong> {userData.role}<br />
          </div>
        </Col>

        <Col md={4} className="me-3 my-4 p-4 border rounded shadow-sm">
          <h4 className="mb-4">Employee Data</h4>

          <Form>
            <Row className="mb-3 align-items-center">
              <Col xs={3}>
                <Form.Label htmlFor="firstName">First name</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  id="firstName"
                  value={userData.firstname}
                  readOnly={!isEditableEmployee}
                  onChange={(e) =>
                    setUserData({ ...userData, firstname: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col xs={3}>
                <Form.Label htmlFor="secondName">Second name</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  id="secondName"
                  value={userData.secondName}
                  readOnly={!isEditableEmployee}
                  onChange={(e) =>
                    setUserData({ ...userData, secondName: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col xs={3} >
                <Form.Label htmlFor="surname">Surname</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  id="surname"
                  value={userData.surname}
                  readOnly={!isEditableEmployee}
                  onChange={(e) =>
                    setUserData({ ...userData, surname: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col xs={3}>
                <Form.Label htmlFor="email">Email</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="email"
                  id="email"
                  value={userData.email}
                  readOnly={!isEditableEmployee}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col xs={3}>
                <Form.Label htmlFor="phoneNumber">Phone number</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="tel"
                  id="phoneNumber"
                  value={userData.phoneNumber}
                  readOnly={!isEditableEmployee}
                  onChange={(e) =>
                    setUserData({ ...userData, phoneNumber: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Button
              ref={employeeRef}
              className="me-2"
              onClick={handleEditEmployeeClick}
            >
              Edit
            </Button>
            <Button disabled={!isEditableEmployee} type="submit">
              Save
            </Button>
          </Form>
        </Col>

        <Col className="me-3 my-4 p-4 border rounded shadow-sm">
          <h4 className="mb-4">User Data</h4>

          <Form>
            <Row className="mb-3 align-items-center">
              <Col xs={3}>
                <Form.Label htmlFor="username">User name</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  id="username"
                  value={userData.username}
                  readOnly={!isEditableUser}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col xs={3}>
                <Form.Label htmlFor="oldPassword">Old password</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="password"
                  id="oldPassword"
                  placeholder="Enter old password"
                  readOnly={!isEditableUser}
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col xs={3}>
                <Form.Label htmlFor="newPassword">New password</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  readOnly={!isEditableUser}
                />
              </Col>
            </Row>

            <Row className="mb-3 align-items-center">
              <Col xs={3}>
                <Form.Label htmlFor="repeatNewPassword">Repeat new password</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="password"
                  id="repeatNewPassword"
                  placeholder="Repeat new"
                  readOnly={!isEditableUser}
                />
              </Col>
            </Row>
            <div style={{ marginBottom: '20px' }}>
              <Button
                ref={userRef}
                className="me-2"
                onClick={handleEditUserClick}>
                Edit
              </Button>
              <Button disabled={!isEditableUser} type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
