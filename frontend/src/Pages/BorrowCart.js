import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import "./BorrowCart.css";

function BorrowCart() {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [receiveDate, setReceiveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

  /* ===== LOAD GIỎ MƯỢN ===== */
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("borrowCart")) || [];
    setCart(savedCart);
  }, []);

  /* ===== XOÁ SÁCH ===== */
  const removeBook = (bookId) => {
    const updated = cart.filter(item => (item._id || item.isbn) !== bookId);
    setCart(updated);
    localStorage.setItem("borrowCart", JSON.stringify(updated));
  };

  /* ===== TĂNG / GIẢM SỐ LƯỢNG ===== */
  const updateQty = (bookId, type) => {
    const updated = cart.map(item => {
      const id = item._id || item.isbn;
      if (id === bookId) {
        let qty =
          type === "inc" ? item.borrowQty + 1 : item.borrowQty - 1;
        if (qty < 1) qty = 1;
        return { ...item, borrowQty: qty };
      }
      return item;
    });

    setCart(updated);
    localStorage.setItem("borrowCart", JSON.stringify(updated));
  };

  /* ===== TÍNH SỐ NGÀY MƯỢN ===== */
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 7; // Mặc định 7 ngày nếu không tính được
  };

  /* ===== GỬI ĐƠN MƯỢN LÊN BACKEND ===== */
  const submitBorrow = async () => {
    if (!user || !user._id) {
      alert("⚠ Vui lòng đăng nhập để mượn sách");
      return;
    }

    if (!receiveDate || !returnDate) {
      alert("⚠ Vui lòng chọn ngày nhận và ngày trả sách");
      return;
    }

    if (cart.length === 0) {
      alert("⚠ Giỏ mượn đang trống");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const days = calculateDays(receiveDate, returnDate);
      const borrowPromises = [];

      // Gửi từng cuốn sách với số lượng tương ứng
      for (const book of cart) {
        const bookId = book._id || book.book_id;
        if (!bookId) {
          console.error("Book ID không tồn tại:", book);
          continue;
        }

        // Gửi từng cuốn sách theo số lượng borrowQty
        for (let i = 0; i < book.borrowQty; i++) {
          borrowPromises.push(
            axios.post(API_URL + "api/service/borrows", {
              user_id: user._id,
              book_id: bookId,
              days: days,
            })
          );
        }
      }

      // Chờ tất cả các request hoàn thành
      await Promise.all(borrowPromises);

      alert("✅ Đã gửi yêu cầu mượn sách thành công!\nVui lòng đến thư viện đúng lịch hẹn.");
      localStorage.removeItem("borrowCart");
      setCart([]);
      setReceiveDate("");
      setReturnDate("");
    } catch (err) {
      console.error("Error submitting borrow request:", err);
      const errorMessage = err.response?.data?.message || err.message || "Không thể gửi yêu cầu mượn sách";
      setError(errorMessage);
      alert(`❌ Lỗi: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return <h3 style={{ padding: "120px 20px" }}>🛒 Giỏ mượn đang trống</h3>;
  }

  return (
    <div className="cart-page">
      <h2>🛒 Xác nhận mượn sách</h2>

      <div className="cart-layout">

        {/* ===== DANH SÁCH SÁCH ===== */}
        <div className="cart-left">
          {cart.map((book, index) => {
            const bookId = book._id || book.isbn || index;
            return (
              <div className="cart-item" key={bookId}>
                <img
                  src={book.image || `https://covers.openlibrary.org/b/isbn/${book.isbn || "0000000000"}-M.jpg`}
                  alt={book.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/no-book-cover.png";
                  }}
                />
                <div className="cart-info">
                  <h4>{book.title}</h4>
                  <p>Tác giả: {book.author}</p>

                  <div className="qty-control">
                    <button onClick={() => updateQty(bookId, "dec")}>−</button>
                    <span>{book.borrowQty}</span>
                    <button onClick={() => updateQty(bookId, "inc")}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeBook(bookId)}
                  >
                    ❌ Xoá
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== THÔNG TIN MƯỢN ===== */}
        <div className="cart-right">
          <p className="notice">
            ⚠ Thư viện không hỗ trợ đọc sách online.  
            Người đọc cần đến trực tiếp thư viện để nhận và trả sách theo lịch đã đăng ký.
          </p>

          <label>📅 Ngày đến nhận sách</label>
          <input
            type="date"
            value={receiveDate}
            onChange={e => setReceiveDate(e.target.value)}
          /> <br />

          <label>📅 Ngày dự kiến trả sách</label>
          <input
            type="date"
            value={returnDate}
            onChange={e => setReturnDate(e.target.value)}
          />

          {/* 👤 THÔNG TIN NGƯỜI MƯỢN */}
          <div className="user-info">
            <p><strong>Họ tên:</strong> {user?.username || user?.fullName || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
            <p><strong>SĐT:</strong> {user?.phone || "Chưa cập nhật"}</p>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
              ⚠ {error}
            </p>
          )}

          <button
            className="btn-confirm"
            onClick={submitBorrow}
            disabled={submitting || !user}
          >
            {submitting ? "⏳ Đang gửi..." : "📤 Xác nhận mượn sách"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default BorrowCart;
