import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Allbooks.css";

const ITEMS_PER_PAGE = 12;

function Allbooks() {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

  /* ===== FETCH SÁCH TỪ BACKEND ===== */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL + "api/books");
        setBooks(response.data || []);
        setError("");
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Không thể tải danh sách sách. Vui lòng thử lại sau.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [API_URL]);

  /* 🔹 THÊM: trạng thái loading theo sách */
  const [loadingBook, setLoadingBook] = useState(null);

  /* ===== PHÂN TRANG ===== */
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  /* ===== THÊM SÁCH VÀO GIỎ MƯỢN ===== */
  const handleBorrow = (book) => {
    if (book.stock === 0) return;

    setLoadingBook(book._id);

    setTimeout(() => {
      const currentCart = JSON.parse(localStorage.getItem("borrowCart")) || [];
      const existed = currentCart.find(item => item._id === book._id);

      let updatedCart;
      if (existed) {
        updatedCart = currentCart.map(item =>
          item._id === book._id
            ? { ...item, borrowQty: item.borrowQty + 1 }
            : item
        );
      } else {
        // Map dữ liệu từ backend sang format cho cart
        updatedCart = [...currentCart, { 
          ...book, 
          borrowQty: 1,
          // Giữ lại các field cần thiết cho BorrowCart
          quantity: book.stock,
          category: book.genre || "General"
        }];
      }

      localStorage.setItem("borrowCart", JSON.stringify(updatedCart));
      setLoadingBook(null);
      history.push("/books/borrow-cart");
    }, 600);
  };

  if (loading) {
    return (
      <div className="books-page" style={{ padding: "120px 20px", textAlign: "center" }}>
        <p>⏳ Đang tải danh sách sách...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="books-page" style={{ padding: "120px 20px", textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="books-page">
      <div className="books">
        {currentBooks.map((book, index) => (
          <div className="book-card" key={book._id || index}>
            <img
              src={book.image || `https://covers.openlibrary.org/b/isbn/${book.isbn || "0000000000"}-L.jpg`}
              alt={book.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/no-book-cover.png";
              }}
            />
            <p className="bookcard-title">{book.title}</p>
            <p className="bookcard-author">By {book.author}</p>
            <div className="bookcard-category">
              <p>{book.genre || "General"}</p>
            </div>

            <button
              className="btn-confirm"
              disabled={book.stock === 0 || loadingBook === book._id}
              onClick={() => handleBorrow(book)}
            >
              {book.stock === 0
                ? "🔒 Hết sách"
                : loadingBook === book._id
                ? "⏳ Đang thêm..."
                : "🛒 Mượn sách"}
            </button>
          </div>
        ))}
      </div>

      {/* ===== PAGINATION ===== */}
      {books.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            ⬅ Previous
          </button>
          <span>Page {page} / {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default Allbooks;
