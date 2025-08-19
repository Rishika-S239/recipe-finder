import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {Routes, Route} from 'react-router-dom';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Recipes from "./components/Recipes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<Recipes />} />
      </Routes>
    </>
  );
}

export default App;
