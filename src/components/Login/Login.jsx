// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

 
// function Login({ setRole }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = { email, password };
 
// axios.post('/home/login', userData)
//       .then((response) => {
//         console.log(response.status, response.data.token);
//         getRole();
//         navigate('/books');
//       })
//       .catch((error) => {
//         console.log(error.response.status);
//         if (error.response.status === 404) {
//           alert('Oops!', 'User Not Found! Please Signup', 'error');
//         } else if (error.response.status === 500) {
//           alert('Oops!', 'Unable To Login!', 'error');
//         } else {
//           alert('Oops!', 'Internal Error', 'error');
//         }
//       });
//   };
 
//   const getRole = async () => {
//     try {
//       const response = await axios.get('/home/get-role');
//       const userRole = response.data;
//       console.log('role', userRole);
//       setRole(userRole);
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   };
 
//   return (
//     <>
//     <div
//         className="image-background"
//         // style={{
//         //   backgroundImage: `url('https://miro.medium.com/v2/resize:fit:1200/1*6Jp3vJWe7VFlFHZ9WhSJng.jpeg')`,
//         // }}
//       >
//         <form className="form" onSubmit={handleSubmit}>
//           <div className="title">
//             Welcome,
//             <br />
//             <span>Login to continue</span>
//          </div>
//           <input
//             // type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={handleChange}
//             required="required"
//           />
        
//           <label htmlFor="password">Password</label>
//           <input
//             // type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit" className="but-confirm" onClick={handleSubmit} >
//             Submit →
//           </button>
//         </form>
//       </div>
//       </>
//   );
// }
 
// export default Login;
import React ,{ useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';



function Login({role, setRole}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpFormVisible, setOtpFormVisible] = useState(false);
  const [sendOtpButtonVisible, setSendOtpButtonVisible] = useState(true);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
    };

    axios.post('/home/login', userData)
      .then((response) => {
        // console.log(response)
        console.log(response.status, response.data.token);
        setOtpFormVisible(true);
        setSendOtpButtonVisible(false);
        
      })
      .catch((error) => {
        console.log(error.response.status);
        if(error.response.status === 404){
          alert( "Enter correct email", "error");
        }else if (error.response.status === 500){
          alert("Unable To Login!", "error");
        }else{
          alert("Internal Error","error")
        }
      });
  };
  const navigate = useNavigate();

  const handleChange1 = (e) => {
    setPassword(e.target.value);
  };
  // const userRole = (data) => {
  //   setRole()
  // }

  // const [newRole, setNewRole] = useState({})
  useEffect(() => {
  }, [role]);

  const getRole = async() =>{
        await axios.get("/home/get-role")
        .then((response)=>{
            // console.log(response.data)
            const userRole = response.data
            console.log("role3",userRole)
            setRole(userRole);
            // console.log(role)
        })
        .catch(error => console.error(`Error: ${error}`));
    }
    

  const handleSubmit1 = (e) => {
    e.preventDefault();
    const userData = {
      password: password,
    };
    console.log(userData)
    axios.post('/home/otp', userData)
    
    .then((response) => {
      console.log(response.status, response.data.token);
      getRole()
      navigate("/books")
    })
    .catch((error) => {
      console.log(error.response.status);
      if(error.response.status === 400){
        alert("Oops! Wrong Password!", "error")
      }
    });
  };

  return (
    <>
     
     <form className='form'>
        <div className="title">
            Welcome,
             <br />
             <span>Login to continue</span>
          </div>
          <form  >
            <div >
              <input type='email' name="email" placeholder='Email' onChange={handleChange} required />
            </div>
            {sendOtpButtonVisible && <button className="but-confirm" type="submit" onClick={handleSubmit}>Next</button>}
          </form>
          {otpFormVisible && (
            <form >
              <input type="password" name="password" placeholder="Enter Password" onChange={handleChange1} required />
              <button className='but-confirm' type="submit" onClick={handleSubmit1}>login</button>
            </form>
          )}
        </form>
      
    </>
  );
}

export default Login;