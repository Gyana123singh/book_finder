import axios from "axios";

const BASE_URL = "https://openlibrary.org";

// Search books by keyword
export const searchBooks = async (query, page = 1) => {
  try {
    const res = await axios.get("https://openlibrary.org/search.json", {
      params: { q: query, page },
    });
    return res.data;
  } catch (err) {
    console.error("Error searching books:", err);
    return null;
  }
};

// Fetch book details by OLID
export const fetchBookDetails = async (olid) => {
  try {
    const res = await axios.get(`${BASE_URL}/works/${olid}.json`);
    return res.data;
  } catch (err) {
    console.error("Error fetching book details:", err);
    return null;
  }
};
