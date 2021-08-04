const router = require('express').Router()
const MidtransContoller = require('../controllers/MidtransController')



router.post('/createTransaction', MidtransContoller.createTransaction)
router.post('/notification/handling', MidtransContoller.notificationHandler)



module.exports = router