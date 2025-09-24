import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            📖 About <span className="text-pink-500">Book Finder</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Book Finder is your digital library companion — designed to make
            searching and discovering books easier for students, researchers,
            and readers everywhere.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white shadow-md rounded-xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🌟 Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We believe learning should never stop. Whether Alex is preparing
              for college exams, diving into research, or just looking for a
              great novel to read, Book Finder connects students with millions
              of books powered by{" "}
              <span className="font-bold text-pink-500">Open Library</span>.
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Mission"
            className="w-48 md:w-64 mx-auto"
          />
        </div>

        {/* Features Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded-xl text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-pink-500 mb-2">🔍 Easy Search</h3>
            <p className="text-sm text-gray-600">
              Find books instantly by title, author, or ISBN.
            </p>
          </div>
          <div className="bg-white p-6 shadow rounded-xl text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-pink-500 mb-2">📕 Latest Books</h3>
            <p className="text-sm text-gray-600">
              Explore the newest releases and trending titles.
            </p>
          </div>
          <div className="bg-white p-6 shadow rounded-xl text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-pink-500 mb-2">⭐ Student-Friendly</h3>
            <p className="text-sm text-gray-600">
              Designed to help learners like Alex grow knowledge every day.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center pt-10">
          <p className="text-lg text-gray-700 font-medium">
            🚀 Start your learning journey today with{" "}
            <span className="text-pink-500 font-bold">Book Finder</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
