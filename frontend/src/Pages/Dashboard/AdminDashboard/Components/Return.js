import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import '../../MemberDashboard/MemberDashboard.css'


function Return() {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"
    const [allTransactions, setAllTransactions] = useState([])

    /* Getting all transactions */
    useEffect(()=>{
        const getAllTransactions = async () =>{
            try{
                const response = await axios.get(API_URL+"api/service/get_all_transaction")
                const data = response.data.data || []
                setAllTransactions(data)
            }
            catch(err){
                console.log(err)
            }
        }
        getAllTransactions()
    },[API_URL])


    const returnBook = async (transactionId) =>{
        try{
            await axios.post(API_URL+"api/service/return_book",{
                borrow_id: transactionId
            })
            setAllTransactions(allTransactions.map(t => t._id === transactionId ? {...t, status:"returned"} : t))
            alert("Book returned to the library successfully")
        }
        catch(err){
            console.log(err)
            alert("Không thể trả sách")
        }
    }

    return (
        <div>
            <p className="dashboard-option-title">Borrowed</p>
            <table className="admindashboard-table">
                    <tr>
                        <th>Book Name</th>
                        <th>User Name</th>
                        <th>Borrow Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    {
                        allTransactions?.map((data, index) => {
                            return (
                                <tr key={data._id || index}>
                                    <td>{typeof data.book_id === 'object' ? data.book_id?.title || 'N/A' : data.book_id || 'N/A'}</td>
                                    <td>{typeof data.user_id === 'object' ? data.user_id?.name || 'N/A' : data.user_id || 'N/A'}</td>
                                    <td>{data.borrow_date ? data.borrow_date.slice(0,10) : ""}</td>
                                    <td>{data.due_date ? data.due_date.slice(0,10) : ""}</td>
                                    <td>{data.status}</td>
                                    <td><button disabled={data.status === "returned"} onClick={()=>{returnBook(data._id)}}>Return</button></td>
                                </tr>
                            )
                        })
                    }
                </table>
        </div>
    )
}

export default Return
