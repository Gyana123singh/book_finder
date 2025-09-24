import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Main Footer with custom gradient + bg image */}
      <footer
        className="text-white px-6 py-15"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(90,0,0,0.9) 100%), url('/Footer_bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Branding */}
          <aside>
            <h2 className="text-xl font-bold mb-2">📚 Book Finder</h2>
            <p className="text-sm text-gray-200">
              Your digital library companion.
            </p>
          </aside>

          {/* Quick Links */}
          <nav>
            <h6 className="font-semibold mb-2">Quick Links</h6>
            <ul className="space-y-2 text-sm">
              <li
                className="hover:text-yellow-200 cursor-pointer"
                onClick={() => navigate("/all-books?latest=true")}
              >
                📕 Latest Books
              </li>
              <li
                className="hover:text-yellow-200 cursor-pointer"
                onClick={() => navigate("/all-books")}
              >
                🔍 Search Books
              </li>
              <li
                className="hover:text-yellow-200 cursor-pointer"
                onClick={() => navigate("/about")}
              >
                ℹ️ About Us
              </li>
            </ul>
          </nav>

          {/* Mission */}
          <div>
            <h6 className="font-semibold mb-2">Our Mission</h6>
            <p className="text-sm text-gray-200">
              Powered by <span className="font-bold">Open Library</span>.
              Designed for learners like Alex.
            </p>
          </div>
        </div>
        <div className=" text-center pt-16 text-sm text-gray-400">
          © {new Date().getFullYear()} Book Finder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
