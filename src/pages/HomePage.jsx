import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../public/Banner.png";
import { searchBooks } from "../Api/FreeApi"; // ✅ your API

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/all-books?q=${encodeURIComponent(query)}`);
    }
  };

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Fetch Gandhi books only once
  useEffect(() => {
    const fetchBooks = async () => {
      const data = await searchBooks("Gandhi");
      if (data && data.docs) {
        setBooks(data.docs.slice(0, 15));
      }
    };
    fetchBooks();
  }, []);

  // Auto slide
  useEffect(() => {
    if (books.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [books]);

  // Reset index when reaching the end
  useEffect(() => {
    if (books.length === 0) return;

    if (currentIndex >= books.length) {
      // wait until the animation finishes, then jump back to 0 without animation
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(0);
      }, 700); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, books.length]);

  // Slide width
  const getSlideWidth = () => {
    if (isMobile && sliderRef.current) {
      return sliderRef.current.offsetWidth;
    }
    return 180;
  };

  const slideWidth = getSlideWidth();

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full mx-auto px-2 sm:px-3 md:px-20 py-10 md:py-16 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/2 space-y-5 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-snug">
            📚 Discover Books, Unlock Knowledge
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl">
            Find your next favorite book with just a search. Whether it’s for{" "}
            <span className="font-semibold text-pink-500">study, research</span>,
            or leisure, Book Finder makes discovering stories and authors easier
            than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/all-books?latest=true")}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg cursor-pointer shadow hover:bg-pink-600 transition"
            >
              🔍 Start Searching Now
            </button>
            <button
              onClick={() => navigate("/all-books?latest=true")}
              className="bg-gray-200 px-6 py-2 rounded-lg cursor-pointer shadow hover:bg-gray-300 transition"
            >
              ⭐ Browse Latest Books
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={banner}
            alt="Books"
            className="w-[220px] sm:w-[320px] md:w-[500px] object-contain"
          />
        </div>
      </div>

      {/* Infinite Books Slider */}
      <div
        className="px-4 sm:px-6 md:px-20 pb-20 overflow-hidden"
        ref={sliderRef}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6">📖 Featured Books</h2>

        <div className="relative w-full overflow-hidden">
          <div
            className={`flex ${
              isAnimating ? "transition-transform duration-700 ease-in-out" : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * slideWidth}px)`,
            }}
          >
            {books.map((book, i) => {
              const coverId = book.cover_i;
              const imageUrl = coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                : "https://via.placeholder.com/150";
              const workId = book.key.split("/").pop();

              return (
                <div
                  key={book.key + i}
                  onClick={() => navigate(`/book/${workId}`)}
                  className={`${
                    isMobile
                      ? "min-w-full"
                      : "min-w-[160px] sm:min-w-[180px] mx-2"
                  } bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer`}
                >
                  <img
                    src={imageUrl}
                    alt={book.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                      {book.author_name?.[0] || "Unknown Author"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
