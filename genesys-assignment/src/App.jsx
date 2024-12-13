import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //use react-router for page routing
import Home from "./pages/Home";
import Profile from "./pages/Profile";

//route set up using react router, passing the character id to the profile page and component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
