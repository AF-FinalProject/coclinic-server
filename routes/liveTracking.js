const router = require('express').Router()
const LiveTrackingController = require('../controllers/LiveTrackingController')
const { authAdmin } = require('../middlewares/auth')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.put('/:id', authAdmin, LiveTrackingController.update)
router.get('/:id', authAdmin, LiveTrackingController.detail)
// kurang router satu lagi untuk delete live tracking? tapi tergantung
// LT belongs to order
// sebelunya mau nanya dulu, apakah jika dia negatif maka kita mau hapus orderId negatif ini dr db?
// Jika iya: solusi 
// 1. kalau tidak mau bikin router untuk delete, di rendy controller UpdateOrderById, jika status swab negatif maka hapus data OrderId ini di LT
// 2. kalau mau dibuat route delete, maka jangan lupa hapus juga Order nya, tapi menurutku order ini ga boleh didelete dr db (bisa untuk history transaksi)

// best options:(maybe)
// di  rendy UpdateOrderById kasi 1 kondisi lagi, jika memang status_swab nya negatif maka hapus juga si LT nya sesuai orderID

module.exports = router