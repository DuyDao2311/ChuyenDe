const Router = require('express')

const {borrowBook, returnBook, getAllTranSactions} = require('../controllers/borrow_transaction.controller')
const router = Router()

router.route('/borrows').post(borrowBook)
router.route('/return_book').post(returnBook)
router.route('/get_all_transaction').get(getAllTranSactions)
module.exports = router