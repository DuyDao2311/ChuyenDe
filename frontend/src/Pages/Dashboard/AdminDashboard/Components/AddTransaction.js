import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"

function AddTransaction() {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"
    const [isLoading, setIsLoading] = useState(false)

    const [userId, setUserId] = useState("")
    const [bookId, setBookId] = useState("")
    const [days, setDays] = useState(7)
    const [recentTransactions, setRecentTransactions] = useState([])

    /* Adding a Transaction */
    const addTransaction = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (bookId !== "" && userId !== "" && days > 0) {
            const transactionData = {
                user_id: userId,
                book_id: bookId,
                days: Number(days)
            }
            try {
                const response = await axios.post(API_URL + "api/service/borrows", transactionData)
                setRecentTransactions([response.data.borrow || response.data, ...recentTransactions].slice(0,5))
                setUserId("")
                setBookId("")
                setDays(7)
                alert("Borrow created 🎉")
            }
            catch (err) {
                console.log(err)
                alert("Không thể tạo giao dịch")
            }
        }
        else {
            alert("Fields must not be empty")
        }
        setIsLoading(false)
    }


    /* Fetch Transactions */
    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axios.get(API_URL + "api/service/get_all_transaction")
                const data = response.data.data || []
                setRecentTransactions(data.slice(0, 5))
            }
            catch (err) {
                console.log("Error in fetching transactions")
            }

        }
        getTransactions()
    }, [API_URL])


    return (
        <div>
            <p className="dashboard-option-title">Add a Transaction</p>
            <div className="dashboard-title-line"></div>
            <form className='transaction-form' onSubmit={addTransaction}>
                <label className="transaction-form-label" htmlFor="userId">User Id<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" value={userId} onChange={(e)=>setUserId(e.target.value)} required />

                <label className="transaction-form-label" htmlFor="bookId">Book Id<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" value={bookId} onChange={(e)=>setBookId(e.target.value)} required />

                <label className="transaction-form-label" htmlFor="days">Days<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="number" value={days} min={1} onChange={(e)=>setDays(e.target.value)} required />

                <input className="transaction-form-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
            </form>
            <p className="dashboard-option-title">Recent Transactions</p>
            <div className="dashboard-title-line"></div>
            <table className="admindashboard-table">
                <tr>
                    <th>S.No</th>
                    <th>Book Name</th>
                    <th>User Name</th>
                    <th>Status</th>
                </tr>
                {
                    recentTransactions.map((transaction, index) => {
                        return (
                            <tr key={transaction._id || index}>
                                <td>{index + 1}</td>
                                <td>{typeof transaction.book_id === 'object' ? transaction.book_id?.title || 'N/A' : transaction.book_id || 'N/A'}</td>
                                <td>{typeof transaction.user_id === 'object' ? transaction.user_id?.name || 'N/A' : transaction.user_id || 'N/A'}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AddTransaction