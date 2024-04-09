import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, Form, Label, Input, Container, Row, Col} from "reactstrap";

function Login({ login }) {
  const history = useHistory();

  const [formData, setFormData] = useState({ 
    username: "", 
    password: "" 
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors([]); // Clear errors when user interacts with the form
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true); // Set loading state before making the API call

    try {
      let result = await login(formData);
      if (result && result.success) {
        localStorage.setItem('username', formData.username); // Save username in localStorage
        history.push("/");
      } else {
        setErrors(["Invalid username or password"]);
      }
    } catch (error) {
      console.error("An error occurred while handling form submission", error);
      if (error.response && error.response.status === 401) {
        setErrors(["Unauthorized. Please check your credentials."]);
      } else {
        setErrors(["An error occurred. Please try again."]);
      }
    } finally {
      setLoading(false); // Clear loading state after API call completes
    }
  }

  return (
    <Container className='card-center'>
      <Card>
        <CardBody>
          <CardTitle tag="h2">Login</CardTitle>
          <Form onSubmit={handleSubmit} className="login-form">
              <Row>
                <Label for="username" tag="h4">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  size="lg"
                  required
                />
              </Row>
              
              <Row>
                <Label for="password" tag="h4">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  size="lg"
                  required
                />
              </Row>

            {loading ? (
              <button className="blue-button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
            ) : (
              <button className="blue-button">Submit</button>
            )}
            {errors.length > 0 && (
              <div className="alert alert-danger mt-3">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

          </Form>
        </CardBody>
      </Card>
    </Container>
    
  );
}

export default Login;
