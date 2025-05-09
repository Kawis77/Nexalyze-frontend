import { Form, Button, Alert, Container } from "react-bootstrap";
import { useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Login = () =>{

  const navigate = useNavigate();

    const subdomain = window.location.hostname.split('.')[0];  

    const [formData , setFormData] = useState({
      username: "",
      password: "",
      tenantId:""
    });

    formData.tenantId = subdomain;


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
    
        setMessage("");
        setError("");

        try {
          const response = await axios.post("http://localhost:8080/auth/login", formData , {
            headers: {
                "Content-Type": "application/json",
              }
          });
          setMessage(response.data.message);     
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("tenantId", formData.tenantId); 
          navigate("/dashboard");
        } catch (response) {
            if (response.response && Array.isArray(response.response.data)) {
              setError(response.response.data.join("\n"));
            } else {
           console.log(response);
              setError("Login failed. Please try again." + response.data.message);
              console.log(error);
            
            }
          }
      }


return(
<Container>
    {error && <Alert variant="danger">{error}</Alert>}
    {message && <Alert variant="success">{message}</Alert>}
<Form onSubmit={handleSubmit}>
    <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control 
        type="text" 
        name="username"
        value={formData.username}
        placeholder="Enter username" 
        onChange={handleChange}/>
    </Form.Group>

    <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        name="password"
        placeholder="Password" 
        value={formData.password}
        onChange={handleChange}/>
    </Form.Group>
    <Button variant="primary" type="submit">
          Submit
        </Button>
</Form>

</Container>
)

}

export default Login;