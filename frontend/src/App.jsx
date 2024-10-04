import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Layout from "../src/Components/Layout";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/Login";
import Posts from "../src/pages/Posts";
import Signup from "../src/pages/Signup";
import CreatePost from "../src/pages/CreatePost";
import Protected from "./Components/Protected";
import UserProfile from "./pages/UserProfile";
import Readblogs from "./pages/Readblogs";
import ViewProfile from "./pages/ViewProfile"
import Verifyemail from "./pages/Verifyemail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* //these components are rendered in outlet in layout// */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<Verifyemail/>}/>

          <Route element={<Protected />}>
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Readblogs />} />
            <Route path="/create" element={<CreatePost />} />
            
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/:name" element={<ViewProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
