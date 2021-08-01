const router = require('express').Router()
const MidtransContoller = require('../controllers/MidtransController')
const { authentication, authCustomer } = require('../middlewares/auth')


router.post('/notification/handling', MidtransContoller.notificationHandler)
router.use(authentication)
router.post('/createTransaction', authCustomer, MidtransContoller.createTransaction)



module.exports = router