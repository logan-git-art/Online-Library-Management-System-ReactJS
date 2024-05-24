import React, { useState } from 'react'
import SideBar from './Sidebar.jsx'
import axios from 'axios';


function IssueRequest() {

 

    const [data,setData] = useState({
        name: '',
        rid: '',
        Rtype: '',
      });
      const handleChange = (e) =>{
        const {name , value} =e.target;
        setData((prevData)=>({
          ...prevData,
          [name]: value,
        }))
      }

    const handleSubmit =(e)=>{
        e.preventDefault();

        axios.post('/user/issue-request', data, {
        headers: {
        'Content-type': 'multipart/form-data',}})
        .then((response) => {
            console.log(response.status, response.data.token);
            alert("Request Raised Successfully!","success")
        })
        .catch((error) => {
            console.log(error.response);
            if(error.response.status === 404){
                alert("Oops!", "Book Not Found!", "error");
            }else{
                alert("Oops!","Please Check Feed Data!","error")
            }
        });
    }

    return (
        <div className="box-container">
            <SideBar/>
            <div className="addBook-div">
                <h2>Issue Request</h2>
                <form className="group-book">
                    <input className='input' type="text" placeholder="ISBN" onChange={handleChange} name="isbn" required/>
                    <input className='input' type="number" placeholder="UserID" onChange={handleChange} name="rid" required/>
                    <input className='input' type="text" placeholder="Request Type" onChange={handleChange} name="Rtype" required/>
                    <button className="buttons" type="submit" onClick={handleSubmit} >Submit Request</button>
                </form>
            </div>
        </div>
    )
}

export default IssueRequest
