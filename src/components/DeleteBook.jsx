import React, { useState }  from 'react'
import axios from 'axios';
import "./addbook.css"
import Sidebar from './Sidebar.jsx';


function Deletebook() {
    const [data,setData] = useState({isbn: '',});
    const handleChange = (e) =>{
        const {name , value} =e.target;
        setData((prevData)=>({
          ...prevData,
          [name]: value,
        }))
      }

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.post('/admin/delete-book', data, {
        headers: {
        'Content-type': 'multipart/form-data',}})
        .then((response) => {
            console.log(response.status, response.data.token);
            alert("Book Deleted Successfully","success")
        })
        .catch((error) => {
            console.log(error.response);
            if(error.response.status === 404){
            alert( "Book Not Found", "error");
            }else if (error.response.status === 500){
                alert( "Failed to Delete Book!", "error");
            }else{
            alert("Oops books can't be deleted, books are issued ","error")
            }
        });
    }
  return (
    <>
      <div className='box-container'>
        <Sidebar/>

        <div style={{
          height:"calc(50vh - 10px);",
          width:"50vh",
          margin:"auto",
          marginTop:"90px",
          marginLeft:"30%"
          }}>
            <form style={{display:"flex", flexDirection:"column", width:"20rem"}}>
            
            <h2>Enter ISBN </h2>
            <input className="input" type="text" placeholder="ISBN" name="isbn" onChange={handleChange} required/>
           <br />
            <button className="buttons" type="submit" onClick={handleSubmit} >Delete Book</button>
            </form>
        </div>
        </div>
    </>
  )
}

export default Deletebook
