import React, { useState } from "react";
import axios from "axios";
import "./addbook.css";
import Sidebar from "./Sidebar.jsx";
 
function AddBook() {
  const [data, setData] = useState({
    isbn: "",
    lib_id: "",
    title: "",
    authors: "",
    publisher: "",
    version: "",
    total_copies: "",
    available_copies: ""
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value // Trim leading and trailing spaces
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Validation checks
    const { isbn, lib_id, title, authors, publisher, version, total_copies, available_copies } = data;
   
    if (!isbn.trim() || !lib_id.trim() || !title.trim() || !authors.trim() || !publisher.trim() || !version.trim() || !total_copies.trim() || !available_copies.trim()) {
      alert("Please fill out all required fields");
      return;
    }
   
    if (isNaN(lib_id) || isNaN(version) || isNaN(total_copies) || isNaN(available_copies)) {
      alert("Numeric fields must contain valid numbers");
      return;
    }
   
 
    // Form data is valid, proceed with API call
    axios
      .post("/admin/add-book", data, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log(response.status, response.data.token);
        alert("Book added successfully!!");
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response && error.response.status === 403) {
          alert("Oops! Wrong credentials!");
        } else if (error.response && error.response.status === 400) {
          alert("Oops! Bad Request!");
        } else {
          alert("Oops! Server Error!");
        }
      });
  };
 
  return (
    <>
      <div className="box-container">
        <Sidebar />
        <div className="addBook-div">
          <h2>Add Book</h2>
          <form className="group-book">
            <input
              type="text"
              placeholder="ISBN"
              name="isbn"
              className="input"
              value={data.isbn}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Library ID"
              name="lib_id"
              className="input"
              value={data.lib_id}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="input"
              value={data.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Authors"
              name="authors"
              className="input"
              value={data.authors}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Publisher"
              name="publisher"
              className="input"
              value={data.publisher}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Version"
              name="version"
              className="input"
              value={data.version}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Total Copies"
              name="total_copies"
              className="input"
              value={data.total_copies}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Available Copies"
              name="available_copies"
              className="input"
              value={data.available_copies}
              onChange={handleChange}
              required
            />
            <button className="buttons" type="submit" onClick={handleSubmit}>
              Add Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default AddBook;