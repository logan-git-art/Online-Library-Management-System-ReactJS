import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './allbook.css';
import SideBar from './Sidebar';

 
function AllBooksTable() {
  const [books, setBooks] = useState([]);
 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/admin/all-books');
        console.log(response.data); // Log the received book data
        setBooks(response.data); // Set the books state with fetched data
      } catch (error) {
        console.error(`Error fetching books: ${error.message}`);
        setBooks([]); // Set books state to empty array on error
      }
    };
 
    fetchBooks(); // Call fetchBooks when component mounts
  }, []); // Empty dependency array to run once on mount
 
  return (<>
    <SideBar/>

    <div className="CustomBooksTable-container">
      <h2>All Books</h2>
      <table className="responsive-table CustomBooksTable-table">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Library ID</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Publisher</th>
            <th>Version</th>
            <th>Total Copies</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.isbn}</td>
              <td>{book.lib_id}</td>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.publisher}</td>
              <td>{book.version}</td>
              <td>{book.total_copies}</td>
              <td>{book.available_copies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
  
}
 
export default AllBooksTable;