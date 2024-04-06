import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TamagotchiApi from "../../api";

function Signup() {
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
            let token = await TamagotchiApi.signup(formData);
            localStorage.setItem("token", token);
            history.push("/");
        } catch (err) {
            setErrors(err);
        }
    }
    
    return (
        <div className="signup">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                </div>            
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required={true}
                    />
                </div>

            {errors.length > 0 && (
                    <div className="alert alert-danger">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}


export default Signup;