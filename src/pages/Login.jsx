import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate} from 'react-router-dom';

const Login = () =>{
return(
<Container>
    {error && <Alert variant="danger">{error}</Alert>}
    {message && <Alert variant="success">{message}</Alert>}
<Form onSubmit={handleSubmit}>
    <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
    </Form.Group>

    <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
    </Button>
</Form>

</Container>
)



}