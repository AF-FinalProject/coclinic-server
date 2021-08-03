const snap = require('../helpers/snap-midtrans');
const { Order, Transaction } = require('../models')

class MidtransContoller {
  static async createTransaction(req, res, next) {
    try {
      // client harus ngasi ttg order dan informasi user di req.body.data
      console.log('masuk >>>>>>>>>>>>')
      const { order } = req.body;

      // hardcode 
      const parameter = {
        "transaction_details": {
          "order_id": order.id,
          "gross_amount": order.price,
          "status_payment": order.status_payment,
        },
        "credit_card": {
          "secure": true
        },
        "customer_details": {
          "name": order.User.name,
          "email": order.User.email,
          "phone": order.User.phone_number,
          "address": order.User.address
        }
      };
      console.log(parameter, 'masuk nih createtransaction.....')

      //create redirect url to midtrans
      const detailOrder = await Order.findByPk(+transaction_details.order_id);
      if (detailOrder) {
        const transaction = await snap.createTransaction(parameter)
        //apakah disini langsung kita masukin ke db? tapi belum tentu dia nanti jadi pilih metode pembayarannya// db jadi penuh nanti 
        res.status(200).json(transaction)
      } else {
        next({ msg: "Order not found" })
      }
    } catch (err) {
      const message = err.message
      const statusCode = err.httpStatusCode
      const apiResponse = err.ApiResponse
      const rawHttpClientData = err.rawHttpClientData
      next({ statusCode, apiResponse, rawHttpClientData, message })
    }
  }

  static async notificationHandler(req, res, next) {
    console.log(req.body, 'req.body notif')
    try {
      let { order_id, transaction_id, transaction_time, transaction_status, payment_type, currency, gross_amount, fraud_status, status_payment } = req.body;
      // jika settlement maka ada settlement time dan approval code 
      let newStatusPayment = status_payment
      if (transaction_status == 'capture') {
        if (fraud_status == 'challenge') {
          // transaksi yang ditolak oleh merchant 
          newStatusPayment = 'Ditolak'
        } else if (fraud_status == 'accept') {
          newStatusPayment = 'Berhasil bayar'
        }
      } else if (transaction_status == 'settlement') {
        newStatusPayment = "Berhasil bayar"
      } else if (transaction_status == 'cancel' || transaction_status == 'deny' || transaction_status == 'expire') {
        newStatusPayment = "Gagal"
      } else if (transaction_status == 'pending') {
        newStatusPayment = "Menunggu pembayaran"
      }

      const newTransaction = {
        OrderId: +order_id,
        transaction_id_midtrans: transaction_id,
        transaction_time,
        transaction_status,
        payment_type,
        currency,
        gross_amount: Number(gross_amount),
        fraud_status,
        settlement_time: req.body.settlement_time || null,
        approval_code: req.body.approval_code || null,
      }

      const order = await Order.findByPk(+order_id)
      if (order) {
        await Order.update({ status_payment: newStatusPayment }, { where: { id: +order_id } })
        await Transaction.create(newTransaction)
        res.status(200).json({ OK: "OK" })
      } else {
        next({ msg: "Order not found" })
      }
    } catch (err) {
      const message = err.message
      const statusCode = err.httpStatusCode
      const apiResponse = err.ApiResponse
      const rawHttpClientData = err.rawHttpClientData
      next({ statusCode, apiResponse, rawHttpClientData, message })
    }

  }
}


module.exports = MidtransContoller
