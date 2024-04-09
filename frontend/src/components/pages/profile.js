import React, { useState, useEffect } from "react";
import TamagotchiApi from "../../api";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap"; 
import { Card, CardBody, CardTitle, CardText, Form, Label, Input} from "reactstrap";
import "../../styles/App.css";


function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        async function getUser() {
            try {
                let res = await TamagotchiApi.getCurrentUser(username);
                setUser(res);
                setFormData({
                    password: res.password,
                    email: res.email,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        getUser();
    }, [username]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedUser = await TamagotchiApi.saveProfile(username, formData);
            setUser(updatedUser);
            setEditMode(false);
            console.log("Profile updated successfully!", updatedUser);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <Container className="card-center">
            <Card>
                <CardBody>

            {editMode ? (
                <Form onSubmit={handleSubmit}>
                    <Label>Email:</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    <Label>Password:</Label>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                    <button className="blue-button" type="submit">Save Changes</button>
                </Form>
            ) : (
                <>
                    <CardTitle tag="h5">User Profile</CardTitle>
                    <CardText>Username: {user.username}</CardText>
                    <CardText>Email: {user.email}</CardText>
                    <button className="blue-button" onClick={handleEditClick}>Edit</button>
                </>
            )}
                </CardBody>
            </Card>
        </Container>
    );
}

export default Profile;
