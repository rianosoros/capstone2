import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TamagotchiApi from "../../api";
import { Card, CardBody, CardTitle, Form, Label, Input, Container } from "reactstrap";

function Register() {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let token = await TamagotchiApi.register(formData);
            localStorage.setItem("token", token);
            history.push("/");
        } catch (err) {
            setErrors(err);
        }
    }
    
    return (
        <Container className='card-center'>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Register</CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <Label for="username">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.length > 0 && (
                            <div className="alert alert-danger">
                                {errors.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                        <button className="blue-button">Submit</button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
        
    );
}


export default Register;