import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import './listrequest.css';
 
function Listrequest() {
  const [requests, setRequests] = useState([]);
 
  useEffect(() => {
    getAllRequests();
  }, []);
 
  const getAllRequests = async () => {
    try {
      const response = await axios.get('/admin/list-issue-request');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
 
  
 
  const acceptRequest = async (id) => {
    try {
const response = await axios.post('/admin/approve-request', { ReqID: id });
      console.log(response.data);
      getAllRequests(); // Refresh requests after approval
      alert('Request Approved Successfully!');
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request.');
    }
  };
 
  const rejectRequest = async (id) => {
    try {
const response = await axios.post('/admin/reject-request', { ReqID: id });
      console.log(response.data);
      getAllRequests(); // Refresh requests after rejection
      alert('Request Rejected Successfully!');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request.');
    }
  };
 const renderTableRows = () => {
    if (!requests || requests.length === 0) {
      return <tr><td colSpan="9">No requests found</td></tr>;
    }
 
    return requests.map((request) => (
      <tr key={request.ReqID}>
        <td>{request.ReqID}</td>
        <td>{request.BookID}</td>
        <td>{request.ReaderID}</td>
        <td>{request.RequestDate}</td>
        <td>{request.ApprovalDate}</td>
        <td>{request.ApproverID}</td>
        <td>{request.RequestType}</td>
        <td>{request.Request}</td>
        <td>
          <button onClick={() => acceptRequest(request.ReqID)}>Accept</button>
          <button onClick={() => rejectRequest(request.ReqID)}>Reject</button>
        </td>
      </tr>
    ));
  };
  return (
    <div className="box-container">
      <Sidebar />
      <div className="Listrequest-container">
        <h2>List of Requests</h2>
        <div className="Listrequest-table">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>ReqID</th>
                <th>BookID</th>
                <th>ReaderID</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Approver ID</th>
                <th>Request Type</th>
                <th>Request Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
export default Listrequest;