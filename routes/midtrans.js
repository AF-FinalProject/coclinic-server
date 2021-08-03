const router = require('express').Router()
const MidtransContoller = require('../controllers/MidtransController')
const { authentication, authCustomer } = require('../middlewares/auth')


router.post('/createTransaction', authentication, authCustomer, MidtransContoller.createTransaction)
router.post('/notification/handling', MidtransContoller.notificationHandler)
// router.get('/error/handling', MidtransContoller.errorHandling)

// router.post('/notification/handling', MidtransContoller.notificationHandler)
// router.post('/createTransaction', MidtransContoller.createTransaction)



module.exports = router