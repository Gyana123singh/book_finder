import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import AllBook from "./pages/AllBook";
import { Routes, Route } from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutPage from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <div className=" mt-25">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-books" element={<AllBook />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
