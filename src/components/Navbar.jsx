import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a book title, author, or ISBN.");
      return;
    }
    navigate(`/all-books?q=${encodeURIComponent(query)}`);
    setMenuOpen(false);
  };

  // helper function to check active path
  const isActive = (path) =>
    location.pathname === path ||
    (path === "/all-books" && location.pathname.startsWith("/all-books"));

  return (
    <div>
      {/* Navbar */}
      <nav className="shadow-md px-2 md:px-15 bg-white fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-bold">📚 Book Finder</span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8 font-medium">
            {[
              { label: "Home", path: "/" },
              { label: "Latest Books", path: "/all-books" },
              { label: "About", path: "/about" },
            ].map((item) => (
              <li
                key={item.path}
                onClick={() =>
                  item.path === "/all-books"
                    ? navigate("/all-books?latest=true")
                    : navigate(item.path)
                }
                className={`relative cursor-pointer pb-1 ${
                  isActive(item.path)
                    ? "text-pink-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <span className="hover:text-pink-500 transition-colors duration-300">
                  {item.label}
                </span>
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-pink-600 transform transition-transform duration-300 origin-left ${
                    isActive(item.path)
                      ? "w-full scale-x-100"
                      : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </li>
            ))}
          </ul>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Search by title, author, ISBN"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border rounded-lg px-3 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Search
            </button>
          </form>

          {/* Menu Icon */}
          <button
            className="p-2 rounded hover:bg-gray-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t animate-slideDown">
            <ul className="flex flex-col px-4 py-4 space-y-3 font-medium">
              <li
                className={`px-3 py-2 rounded cursor-pointer ${
                  isActive("/") ? "bg-pink-100 text-pink-600 font-semibold" : ""
                }`}
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
              >
                Home
              </li>
              <li
                className={`px-3 py-2 rounded cursor-pointer ${
                  isActive("/all-books")
                    ? "bg-pink-100 text-pink-600 font-semibold"
                    : ""
                }`}
                onClick={() => {
                  navigate("/all-books?latest=true");
                  setMenuOpen(false);
                }}
              >
                Latest Books
              </li>
              <li
                className={`px-3 py-2 rounded cursor-pointer ${
                  isActive("/about")
                    ? "bg-pink-100 text-pink-600 font-semibold"
                    : ""
                }`}
                onClick={() => {
                  navigate("/about");
                  setMenuOpen(false);
                }}
              >
                About
              </li>
            </ul>

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col items-start space-y-2 px-4 py-3 border-t"
            >
              <input
                type="text"
                placeholder="Search by title, author, ISBN"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-lg w-full hover:bg-pink-600 transition"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
