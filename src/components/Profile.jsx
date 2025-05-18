import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import axios from "axios";
import { useState, useEffect } from 'react';

const Profile = () => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const [userData , setUserData] = useState({
      username: "",
      firstname: "",
      surname: "",
      email: "",
      role: "",

    });


useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/organizationuser/user' , {
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
          <Image
            src="https://randomuser.me/api/portraits/men/75.jpg"
            rounded
            fluid
            alt="Losowy obraz"
            width={250}
            height={300}
            className="d-block mx-auto border rounded shadow-sm"
          />
          <div className="mt-3 ms-5">
            <strong>Name:</strong> {userData.firstname + " " + userData.surname}<br />
            <strong>Department:</strong> Inception<br />
            <strong>System role:</strong> {userData.role}<br />
            <strong>Email:</strong> {userData.email}<br />
            <strong>Phone number:</strong> <br />
            <strong>Role:</strong> {userData.role}<br />
   

          </div>
        </Col>
        <Col md={4} className="me-3 my-4 p-4 border rounded shadow-sm">
          <h4 className="mb-4">Employee Data</h4>

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control value={userData.firstname}/>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md="6" controlId="secondName" >
                <Form.Label>Second name</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="surname" >
                <Form.Label>Surname</Form.Label>
                <Form.Control value={userData.surname} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={userData.email} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="phoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="phone" />
              </Form.Group>
            </Row>
            <Button className='me-2' type="edit">Edit</Button>
            <Button disabled="true" type="submit">Save</Button>
          </Form>
        </Col>
        <Col className="me-3 my-4 p-4 border rounded shadow-sm">
          <h4 className="mb-4">User Data</h4>

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="userName">
                <Form.Label>User name</Form.Label>
                <Form.Control value={userData.username}/>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="oldPassword">
                <Form.Label>Old password</Form.Label>
                <Form.Control type='password' required placeholder="Enter old password" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="newPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control type='password' required placeholder="Enter new password" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="repeatNewPassword">
                <Form.Label>Repeat new password</Form.Label>
                <Form.Control type='password' required placeholder="Repeat new" />
              </Form.Group>
            </Row>
            <Button className='me-2' type="edit">Edit</Button>
            <Button disabled="true" type="submit">Save</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
