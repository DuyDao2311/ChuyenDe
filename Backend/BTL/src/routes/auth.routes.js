const {Router} = require('express')
const {login, register} = require('../controllers/authentication/customer/user.controller')
const {createAdmin} = require('../controllers/authentication/admin/admin.controller')
const router = Router()

router.route('/login').post(login)
router.route('/signup').post(register)
router.route('/admin/signup').post(createAdmin)

module.exports = router