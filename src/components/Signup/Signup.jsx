import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
 
function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    contact_number: "",
    role: "Reader",
    lib_id: 1,
    password: ""
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Validation checks
    const { name, email, contact_number, password } = data;
 
    if (!name.trim() || !email.trim() || !contact_number.trim() || !password.trim()) {
      alert("Please fill out all required fields");
      return;
    }
 
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
 
    if (!/^\d{10}$/.test(contact_number.trim())) {
      alert("Please enter a 10-digit contact number");
      return;
    }
 
    // Form data is valid, proceed with API call
    axios
      .post("/home/signup", data, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log(response.status, response.data.token);
        alert("User Added Successfully", "success");
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response && error.response.status === 404) {
          alert("User Already Exists! Please Login", "error");
        } else {
          alert("Oops! Something went wrong", error.response?.status, "error");
        }
      });
  };
 
  const isValidEmail = (email) => {
    // Basic email validation using regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
 
  return (
    <form className="form">
      <div className="title">
        Welcome, <br />
        <span>sign up to continue</span>
      </div>
      <input
        type="text"
        placeholder="Name"
        pattern="^\S+$"
value={data.name}
        onChange={handleChange}
        name="name"
        required
      />
      <input
        type="email"
        placeholder="Email"
value={data.email}
        onChange={handleChange}
        name="email"
        required
      />
      <input
        type="tel"
        placeholder="Contact"
        value={data.contact_number}
        onChange={handleChange}
        name="contact_number"
        pattern="[0-9]{10}"
        required
      />
      <input type="text" name="role" value={data.role} readOnly />
      <input type="number" value="1" name={data.lib_id} readOnly />
      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        name="password"
        required
        minLength={6}
      />
      <button className="but-confirm" onClick={handleSubmit}>
        Sign Up →
      </button>
    </form>
  );
}
 
export default Signup;