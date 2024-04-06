import React, { useState, useEffect } from "react";
import TamagotchiApi from "../../api";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap"; 

function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [applications, setApplications] = useState([]);
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
                setApplications(res.applications);
                setFormData({
                    user: res.username,
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
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <Container>
            <h1>{user.username}</h1>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    <button type="submit">Save Changes</button>
                </form>
            ) : (
                <div>
                    <p>{user.email}</p>
                    <p>{user.password}</p>
                    <button onClick={handleEditClick}>Edit Profile</button>
                </div>
            )}
            
        </Container>
    );
}

export default Profile;
