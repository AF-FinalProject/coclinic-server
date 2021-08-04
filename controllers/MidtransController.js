const snap = require('../helpers/snap-midtrans');
const { Order, Transaction } = require('../models')

class MidtransContoller {
  static async createTransaction(req, res, next) {
    try {
      console.log(req.body.data, 'masuk  >>>>>>>>>>>>>>')
      const order = req.body.data;
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

      //create redirect url to midtrans
      const detailOrder = await Order.findByPk(order.id);
      if (detailOrder) {
        const transaction = await snap.createTransaction(parameter)
        res.status(201).json(transaction)
      } else {
        next({ msg: "Order not found" })
      }
      /* istanbul ignore next */
    } catch (err) {
      /* istanbul ignore next */
      let e = err
      /* istanbul ignore next */
      const message = e.message
      /* istanbul ignore next */
      const statusCode = e.httpStatusCode
      /* istanbul ignore next */
      const apiResponse = e.ApiResponse
      /* istanbul ignore next */
      next({ statusCode, apiResponse, message })

      //message: 'Midtrans API is returning API error. HTTP status code: 400. API response: {"error_messages":["transaction_details.order_id sudah digunakan"]}'
    }
  }
  /* istanbul ignore next */
  static async notificationHandler(req, res, next) {
    console.log(req.body, 'req.body notif')
    try {
      let { order_id, transaction_id, transaction_time, transaction_status, payment_type, currency, gross_amount, fraud_status, status_payment } = req.body;
      let newStatusPayment = status_payment
      if (transaction_status == 'capture') {
        if (fraud_status == 'challenge') {
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
      let e = err
      const message = e.message
      const statusCode = e.httpStatusCode
      const apiResponse = e.ApiResponse
      const rawHttpClientData = e.rawHttpClientData
      next({ statusCode, apiResponse, rawHttpClientData, message })
    }
  }
}


module.exports = MidtransContoller
