const snap = require('../helpers/snap-midtrans');
const { Order, Transaction } = require('../models')

class MidtransContoller {
  static async createTransaction(req, res, next) {
    try {
      // client harus ngasi ttg order dan informasi user di req.body.data
      const { transaction_details, customer_details } = req.body.data;
      // hardcode 
      const parameter = {
        "transaction_details": {
          "order_id": transaction_details.order_id,
          "gross_amount": 20
        },
        "credit_card": {
          "secure": secure
        },
        "customer_details": {
          "name": customer.name,
          "email": customer.email,
          "phone": customer.phone_number,
          "address": customer.address
        }
      };

      //create redirect url to midtrans
      const order = await Order.findByPk(+trasaction_details.order_id);
      if (order) {
        const transaction = await snap.createTransaction(parameter)
        res.status(200).json(transaction)
      } else {
        next({ msg: "Order not found" })
      }
    } catch (e) {
      const message = e.message
      const statusCode = e.httpStatusCode
      const apiResponse = e.ApiResponse
      const rawHttpClientData = e.rawHttpClientData
      res.status(statusCode).json({ message, apiResponse, rawHttpClientData })
    }


  }

  static async notificationHandler(req, res, next) {
    console.log(req.body, 'req.body notif')
    try {
      let { order_id, transaction_id, transaction_time, transaction_status, payment_type, currency, gross_amount, fraud_status } = req.body;
      // jika settlement maka ada settlement time dan approval code 
      if (transaction_status == 'capture') {
        if (fraud_status == 'challenge') {
          // transaksi yang ditolak oleh merchant 
          status_payment = 'deny'
        } else if (fraud_status == 'accept') {
          status_payment = 'paid'
        }
      } else if (transaction_status == 'settlement') {
        status_payment = "paid"
      }

      const newTransaction = {
        OrderId: +order_id,
        transaction_id_midtrans: transaction_id,
        transaction_time,
        transaction_status,
        payment_type,
        currency,
        gross_amount,
        fraud_status,
        settlement_time: req.body.settlement_time || null,
        approval_code: req.body.approval_code || null
      }

      const order = await Order.findByPk(+order_id)
      if (order) {
        await Order.update({ status_payment: status_payment }, { where: { id: +order_id } })
        await Transaction.create(newTransaction)
        res.status(200).json({ OK: "OK" })
      } else {
        next({ msg: "Order not found" })
      }
    } catch (e) {
      const message = e.message
      const statusCode = e.httpStatusCode
      const apiResponse = e.ApiResponse
      const rawHttpClientData = e.rawHttpClientData
      res.status(statusCode).json({ message, apiResponse, rawHttpClientData })
    }
  }
  static async errorHandling(req, res, next) {
    try {
      console.log('masuk error handling midtrnas')
    } catch(e) {
      console.log(e, "from error midtrans >>>>>>>")
    }
  }
}


module.exports = MidtransContoller
