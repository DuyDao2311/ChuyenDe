const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        book_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            require: true,
        },
        borrow_date: {
            type: Date,
            default: Date.now
        },
        due_date: {
            type: Date,
            require: true
        },
        return_date: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: ["borrowed", "returned", "overdue", "lost", "damaged", "cancelled"],
            default: "borrowed"
        },
        fine_amount: {
            type: Number,
            default: 0
        },
        note: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("BorrowTransaction", borrowSchema);