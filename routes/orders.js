const router = require('express').Router()
const OrderController = require('../controllers/OrderController')
const { authCustomer, authAdmin } = require('../middlewares/auth')

router.post('/', OrderController.add)
router.get('/', authCustomer, OrderController.fetchAllForCustomer)
router.get('/', authAdmin, OrderController.fetchAllForAdmin) // tambahan router
router.get('/status/:id',authCustomer, OrderController.getStatus)
router.patch('/status/:id', authAdmin, OrderController.updateStatus)
router.patch('/payment/:id', authAdmin, OrderController.updatePayment)
router.delete('/:id', authAdmin, OrderController.delete)

module.exports = router