import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const OrganizationForm = () => {

  const navigate = useNavigate();

  const [formData , setFormData] = useState({
    userName: "",
    firstName: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
    organizationName: "",
    license: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, firstName, surname, email, password, repeatPassword, organizationName, license } = formData;


    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
  
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/organization/create", formData , {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(response.data);
      setMessage("Organizacja została utworzona");
      navigate("/login");
    
    } catch (error) {
      if (error.response && Array.isArray(error.response.data)) {
        setError(error.response.data.join("\n"));
      } else {
        console.log("Błąd:", error);
        setError("Wystąpił błąd przy tworzeniu organizacji.");
      }
    }
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="surname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="repeatPassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="organizationName">
          <Form.Label>Organization Name</Form.Label>
          <Form.Control
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="license">
          <Form.Label>License</Form.Label>
          <Form.Control
            type="text"
            name="license"
            value={formData.license}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default OrganizationForm;
