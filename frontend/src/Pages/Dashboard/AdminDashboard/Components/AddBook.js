import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"

function AddBook() {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"
    const [isLoading, setIsLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [publishedYear, setPublishedYear] = useState("")
    const [image, setImage] = useState("")
    const [summary, setSummary] = useState("")
    const [recentAddedBooks, setRecentAddedBooks] = useState([])

    /* Adding book function */
    const addBook = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const BookData = {
            title,
            author,
            genre,
            price: Number(price),
            stock: Number(stock),
            publishedYear: publishedYear ? Number(publishedYear) : undefined,
            image,
            summary
        }
        try {
            const response = await axios.post(API_URL + "api/books", BookData)
            setRecentAddedBooks([response.data, ...recentAddedBooks].slice(0,5))
            setTitle("")
            setAuthor("")
            setGenre("")
            setPrice(0)
            setStock(0)
            setPublishedYear("")
            setImage("")
            setSummary("")
            alert("Book Added Successfully 🎉")
        }
        catch (err) {
            console.log(err)
            alert("Không thể thêm sách")
        }
        setIsLoading(false)
    }


    useEffect(() => {
        const getallBooks = async () => {
            try{
                const response = await axios.get(API_URL + "api/books")
                setRecentAddedBooks(response.data.slice(0, 5))
            }catch(err){
                console.log(err)
            }
        }
        getallBooks()
    }, [API_URL])


    return (
        <div>
            <p className="dashboard-option-title">Add a Book</p>
            <div className="dashboard-title-line"></div>
            <form className='addbook-form' onSubmit={addBook}>

                <label className="addbook-form-label" htmlFor="title">Title<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="title" value={title} onChange={(e) => { setTitle(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="author">Author<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="author" value={author} onChange={(e) => { setAuthor(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="genre">Genre</label><br />
                <input className="addbook-form-input" type="text" name="genre" value={genre} onChange={(e) => { setGenre(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="price">Price</label><br />
                <input className="addbook-form-input" type="number" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="stock">Stock<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="number" name="stock" value={stock} onChange={(e) => { setStock(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="publishedYear">Published Year</label><br />
                <input className="addbook-form-input" type="number" name="publishedYear" value={publishedYear} onChange={(e) => { setPublishedYear(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="image">Image URL</label><br />
                <input className="addbook-form-input" type="text" name="image" value={image} onChange={(e) => { setImage(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="summary">Summary</label><br />
                <textarea className="addbook-form-input" name="summary" value={summary} onChange={(e) => { setSummary(e.target.value) }}></textarea><br />

                <input className="addbook-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
            </form>
            <div>
                <p className="dashboard-option-title">Recently Added Books</p>
                <div className="dashboard-title-line"></div>
                <table className='admindashboard-table'>
                    <tr>
                        <th>S.No</th>
                        <th>Book Name</th>
                        <th>Added Date</th>
                    </tr>
                    {
                        recentAddedBooks.map((book, index) => {
                            return (
                                <tr key={book._id || index}>
                                    <td>{index + 1}</td>
                                    <td>{book.title}</td>
                                    <td>{(book.createdAt || "").toString().substring(0, 10)}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default AddBook