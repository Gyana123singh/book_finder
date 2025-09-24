import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookDetails } from "../Api/FreeApi";

const BookDetailsPage = () => {
  const { id } = useParams(); // book id (workId)
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const data = await fetchBookDetails(id);
      setBook(data);
      setLoading(false);
    };
    getDetails();
  }, [id]);

  // Loading state with spinner
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 text-lg font-medium">
          Loading book details...
        </p>
      </div>
    );

  // No book found state
  if (!book)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-pink-100 text-pink-600 p-6 rounded-lg shadow-md max-w-md text-center">
          <p className="text-xl font-semibold">No details found</p>
          <p className="mt-2 text-gray-600">
            Sorry, we couldn’t find details for this book. Please try again later.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-pink-500 cursor-pointer text-white rounded-lg hover:bg-pink-600 transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    );

  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://via.placeholder.com/200";

  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        className="mb-6 text-pink-600 border cursor-pointer border-pink-500 px-4 py-2 rounded-lg hover:bg-pink-50 transition"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left - Image */}
        <div className="flex-shrink-0 flex justify-center">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-70 sm:w-64 md:w-72 h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right - Details */}
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {book.title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            {book.description?.value ||
              book.description ||
              "No description available."}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            📅 <span className="font-medium">First published:</span>{" "}
            {book.first_publish_date || "N/A"}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            📖 <span className="font-medium">Subjects:</span>{" "}
            {book.subjects ? book.subjects.slice(0, 5).join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
