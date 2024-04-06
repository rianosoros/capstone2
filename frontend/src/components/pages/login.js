import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <div className="Login">
      <h1>Login</h1>
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
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>
        {loading ? (
          <div className="text-center">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button className="btn btn-primary" type="submit">Submit</button>
        )}
        {errors.length > 0 && (
          <div className="alert alert-danger mt-3">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
