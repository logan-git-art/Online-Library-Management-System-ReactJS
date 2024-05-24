import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import "./addbook.css";
 
function Updatebook() {
  const [data, setData] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    version: '',
    total_copies: '',
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setData((prevData) => ({
      ...prevData,
      [name]: name === 'isbn' ? value : value 
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Validation checks
    const { title, author, publisher, version, total_copies } = data;
 
    if (title.trim() !== '' && title.trim() !== data.title) {
      alert("Title cannot contain only spaces");
      return;
    }
 
    if (author.trim() !== '' && author.trim() !== data.author) {
      alert("Author cannot contain only spaces");
      return;
    }
 
    if (publisher.trim() !== '' && publisher.trim() !== data.publisher) {
      alert("Publisher cannot contain only spaces");
      return;
    }
 
    if (isNaN(version) || isNaN(total_copies)) {
      alert("Version and Total Copies must be valid numbers");
      return;
    }
 
    // Form data is valid, proceed with API call
axios.post('/admin/update-book', data, {
      headers: {
        'Content-type': 'multipart/form-data',
      }
    })
    .then((response) => {
      console.log(response.status, response.data.token);
      alert("Book Updated Successfully!", "success");
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response && error.response.status === 500) {
        alert("Failed to update Book!", "error");
      } else {
        alert("Oops! Wrong credentials", "error");
      }
    });
  };
 
  return (
    <>
      <div className='box-container'>
        <Sidebar/>
        <div className="addBook-div">
          <strong><h2>Update Book</h2></strong>
          <form className="group-book">
            <input className="input" type="text" placeholder="ISBN" name="isbn" value={data.isbn} onChange={handleChange} required />
            <input className="input" type="text" placeholder="Title" name="title" value={data.title} onChange={handleChange} />
            <input className="input" type="text" placeholder="Author" name="author" value={data.author} onChange={handleChange} />
            <input className="input" type="text" placeholder="Publisher" name="publisher" value={data.publisher} onChange={handleChange} />
            <input className="input" type="number" placeholder="Version" name="version" value={data.version} onChange={handleChange} />
            <input className="input" type="number" placeholder="Total Copies" name="total_copies" value={data.total_copies} onChange={handleChange} />
            <button className="buttons" type="submit" onClick={handleSubmit}>Update Book</button>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default Updatebook;