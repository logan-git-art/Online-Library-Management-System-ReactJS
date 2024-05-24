import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import AddBook from "./components/AddBook";
import Book from "./components/Book";
import DeleteBook from "./components/DeleteBook";
import UpdateBook from "./components/UpdateBook";
import ListRequest from "./components/ListRequest";
import SearchBook from "./components/SearchBook";
import Issue from "./components/Issue";
import AllBooks from "./components/AllBook";
import IssueRequest from "./components/IssueRequest";
import SearchResult from "./components/SearchResult";
import Home from "./components/Home";

export default function App() {
  const [role, setRole] = useState("");
  useEffect(() => {
    getRole(role);
  }, [role]);
  const getRole = async (role) => {
    await axios
      .get("/home/get-role")
      .then((response) => {
        // console.log(response.data)
        const userRole = response.data;
        console.log("role", userRole);
        setRole(userRole);
        console.log(role);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <>
      <div className="App">
        <Navbar role={role} setRole={setRole} />
        <Routes>
          <Route
            path="/login"
            element={<Login role={role} setRole={setRole} />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>

          <Route path="/books/*" element={<Book role={role} />}></Route>

          <Route path="/books/addbook" element={<AddBook />}></Route>

          <Route path="/books/deletebook" element={<DeleteBook />}></Route>

          <Route path="/books/updatebook" element={<UpdateBook />}></Route>

          <Route path="/books/listrequest" element={<ListRequest />}></Route>

          <Route path="/searchbook/*" element={<SearchBook />}></Route>

          <Route path="/issue" element={<Issue />}></Route>

          <Route path="/books/allbooks" element={<AllBooks />}></Route>

          <Route path="/books/issuerequest" element={<IssueRequest />}></Route>

          <Route path="/searchbook/result" element={<SearchResult />}></Route>

          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </>
  );
}
