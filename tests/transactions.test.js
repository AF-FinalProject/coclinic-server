// // PR BUAT BESOK NIH

// create user



// const request = require('supertest')
// const app = require('../app')
// const { Order, User } = require('../models')
// const { hashPassword } = require('../helpers/password-helpers')
// const { generateToken } = require('../helpers/token-helper')
// const snap = require('../helpers/snap-midtrans');


// let tokenAdmin;
// let tokenCustomer;
// let customerId;
// let idOrder;
// const idNotFound = 1232;


// const customer = {
//   name: 'Lili',
//   nik: '321111111',
//   email: 'lili@mail.com',
//   password: hashPassword('lili123'),
//   address: 'Jl. Batu Gede Jakarta'
//   phone_number: '085712342222',
//   dob: '1995-01-07',
//   latitude: -6.531673,
//   longitude: 106.796378,
//   createdAt: new Date(),
//   updatedAt: new Date()
// }



// beforeAll(done => {
//   User.findOne({ where: { email: "admin@mail.com" } })
//     .then(admin => {
//       tokenAdmin = generateToken({ id: admin.id, email: admin.email, name: admin.name })
//       return User.create(customer)
//     })
//     .then(customer => {
//       tokenCustomer = generateToken({ id: customer.id, email: customer.email, name: customer.name })
//       customerId = customer.id;
//       return User.findOne({ where: { email: customer.email } })
//     })
//     .then(user => {
//       req.logginUser = { id: user.id, email: user.email, role: user.role }
//       return Order.create({
//         date_swab: new Date()
//       })
//     })
//     .then(order => {
//        idOrder = +order.order.id;
//        const parameter = {
//          "transaction_details:" : {
//            "order_id": idOrder,
//            "gross_amount": 200000
//          },
//          "credit_card:" : {
//            "secure:": true
//          },
//          "customer_details": {
//            "name": customer.name,
//            "email": customer.email,
//            "phone": customer.phone_number,
//            "address": customer.address
//          }
//        }
//        return snap.createTransaction(parameter)
//     })
//     .then(transaction => {
//       done()
//     })
//     .catch(err => done(err))
// })

// afterAll(done => {
//   User.destroy({ where: { id: customerId } })
//     .then(_ => Order.destroy({ where: {} }))
//     .then(_ => done())
//     .catch(err => done(err))
// })


// // POST
// //notification handler 
