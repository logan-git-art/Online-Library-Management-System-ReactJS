import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Import the CSS file with the specified styles
 
function SideBar() {
  const [role, setRole] = useState('');
 
  useEffect(() => {
    getRole(); // Call getRole() without passing role as argument since it's not needed
  }, []); // Use an empty dependency array to run this effect only once after the component mounts
 
  const getRole = async () => {
    try {
      const response = await axios.get("/home/get-role");
      const userRole = response.data;
      console.log("role", userRole);
      setRole(userRole);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
 
  return (
    <Sidebar id="mySidenav" className='sidenav'>
      <Menu >
        {role === 'Admin' && (
          <>
            <MenuItem id="addbook" component={<Link to="/books/addbook" />}>
              Add Book
            </MenuItem>
            <MenuItem id="deletebook" component={<Link to="/books/deletebook" />}>
              Delete Book
            </MenuItem>
            <MenuItem id="updatebook" component={<Link to="/books/updatebook" />}>
              Update Book
            </MenuItem>
            <MenuItem id="listrequest" component={<Link to="/books/listrequest" />}>
              List Request
            </MenuItem>
          </>
        )}
        {role === 'Reader' && (
          <MenuItem id="issuerequest" component={<Link to="/books/issuerequest" />}>
            Issue Request
          </MenuItem>
        )}
        <MenuItem id="allbooks" component={<Link to="/books/allbooks" />}>
          All Books
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
 
export default SideBar;