import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchBooks } from "../Api/FreeApi";

const AllBooksPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const latest = new URLSearchParams(location.search).get("latest");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data;

      if (latest) {
        data = await searchBooks("the", "&sort=new");
      } else if (query) {
        data = await searchBooks(query);
      }

      if (data && data.docs) {
        setBooks(data.docs);
      }
      setLoading(false);
      setCurrentPage(1);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll when new search
    };

    fetchData();
  }, [query, latest]);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const visibleBooks = books.slice(startIndex, startIndex + booksPerPage);

  // helper function for pagination clicks
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-20 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          {latest ? (
            <>Latest Books</>
          ) : (
            <>
              Search results for:{" "}
              <span className="text-pink-500 break-words">{query}</span>
            </>
          )}
        </h2>
        <button
          className="text-pink-500 px-4 py-2 rounded-xl border cursor-pointer hover:bg-pink-50 transition"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 text-base font-medium">
            Loading books...
          </p>
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-pink-100 text-pink-600 p-6 rounded-lg shadow-md max-w-sm text-center">
            <p className="text-lg font-semibold">No books found</p>
            <p className="mt-2 text-gray-600 text-sm">
              Try searching with a different title, author, or keyword.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-pink-600 transition"
            >
              ⬅ Back Home
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {visibleBooks.map((book) => {
              const coverId = book.cover_i;
              const imageUrl = coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                : "https://via.placeholder.com/150";

              const workId = book.key.split("/").pop();

              return (
                <div
                  key={book.key}
                  onClick={() => navigate(`/book/${workId}`)}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={imageUrl}
                    alt={book.title}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {book.author_name?.[0] || "Unknown Author"}
                    </p>
                    <p className="text-sm text-gray-500">
                      First published: {book.first_publish_year || "N/A"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-10 gap-2">
              <button
                onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded cursor-pointer ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded cursor-pointer ${
                      currentPage === page
                        ? "bg-pink-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded cursor-pointer ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllBooksPage;
