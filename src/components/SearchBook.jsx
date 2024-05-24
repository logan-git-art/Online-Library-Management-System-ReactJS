import React, { useState } from 'react';
import './search.css'; // Import your updated CSS file
 
const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
 
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!searchTerm.trim()) {
      alert('Please enter a valid search term.');
      setAlertVisible(true);
      return;
    }
 
    try {
      // Call handleSearch function (assuming it's an async function)
      await handleSearch(searchTerm);
    } catch (error) {
      alert('An error occurred while searching. Please try again.');
      setAlertVisible(true);
    }
  };
 
  const handleAlertClose = () => {
    setAlertVisible(false);
    setAlertMessage('');
  };
 
  return (
    <div className="app-container">
      
      <div className="search-container">
        {alertVisible && (
          <div className="alert">
            <p>{alertMessage}</p>
            <button onClick={handleAlertClose}>Close</button>
          </div>
        )}
 
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" style={{ display: 'none' }}>Search</button>
          <i className="fa fa-search search-icon" aria-hidden="true"></i>
        </form>
      </div>
    </div>
  );
};
 
export default SearchBar;