const router = require('express').Router()
const OrderController = require('../controllers/OrderController')

router.post('/', OrderController.add)
router.get('/', OrderController.fetchAll)
router.get('/status/:id', OrderController.getStatus)
router.patch('/status/:id', OrderController.updateStatus)
router.patch('/payment/:id', OrderController.updatePayment)
router.delete('/:id', OrderController.delete)

module.exports = router