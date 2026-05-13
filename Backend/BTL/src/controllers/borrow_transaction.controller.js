const User = require('../models/auth.model')
const Book = require('../models/book.model')
const BorrowTransaction = require('../models/borrow_transactions.model')

const borrowBook = async (req, res) =>{
    try{
        const {user_id, book_id, days} = req.body;
        const user = await User.findById(user_id);
        console.log(typeof(user_id))
        if(!user){
            return res.status(422).json({message: "nguoi dung chua dang nhap"})
        }
        const book = await Book.findById(book_id);
        if(!book){
            return res.status(422).json({message: "Book not found"})
        }
        if(book.stock <= 0){
            return res.status(400).json({message: "Book is out of stock"})   
        }
        const borrow = await BorrowTransaction.create({
            user_id,
            book_id,
            borrow_date: new Date(),
            due_date: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
            status: "borrowed"
        });
        book.stock -= 1;
        await book.save(); 
        console.log(book.stock)
        return res.status(200).json({
            message: "Borrow successfully",
            borrow
        })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
};
const returnBook = async (req, res) =>{
    const {borrow_id} = req.body;
    const borrow = await BorrowTransaction.findById(borrow_id);
    if(!borrow){
        return res.status(400).json({message: "Transaction book not found"})
    }
    if(borrow.status === "returned"){
        return res.status(400).json({message: "Book already returned"})
    }
    const book = await Book.findById(borrow.book_id);
    if(!book){
        return res.status(400).json({message: "Book not found"})
    }
    borrow.return_date = new Date();
    borrow.status = "returned";
    await borrow.save()
    book.stock += 1;
    await book.save();
    return res.status(200).json({message: "Returned", borrow})
}
const getAllTranSactions = async (req, res) =>{
    try{
        const transaction = await BorrowTransaction.find()
            .populate('book_id', 'title')
            .populate('user_id', 'name')
        return res.status(200).json({message:"Get all transaction successfully",
        data: transaction
    })
    }catch(e){
        return res.status(500).json({message: "Khong the ket noi den database"})
    }
}
module.exports = {
    borrowBook,
    returnBook,
    getAllTranSactions,
}