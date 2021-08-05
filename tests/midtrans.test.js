const request = require('supertest')
const app = require('../app')
const { Order, User, Live_Tracking } = require('../models')
const { hashPassword } = require('../helpers/password-helpers')
const { generateToken } = require('../helpers/token-helper')
const snap = require('../helpers/snap-midtrans');


let spy;
let tokenCustomer;
let customerId;
let newOrder;
let idOrder;
let idNotFound = 12344555555;


const customer = {
  name: 'Lili',
  nik: '321111111',
  email: 'lili@mail.com',
  password: hashPassword('lili123'),
  address: 'Jl. Batu Gede Jakarta',
  phone_number: '085712342222',
  dob: '1995-01-07',
  latitude: -6.531673,
  longitude: 106.796378,
  createdAt: new Date(),
  updatedAt: new Date()
}


beforeAll(done => {
  jest.clearAllMocks();
  User.findOne({ where: { email: "admin@mail.com" } })
    .then(admin => {
      tokenAdmin = admin.access_token;
      return User.create(customer)
    })
    .then(customer => {
      return User.findOne({ where: { email: customer.email } })
    })
    .then(customer => {
      tokenCustomer = generateToken({ id: customer.id, email: customer.email, name: customer.name })
      customerId = customer.id;
      const detailOrder = {
        UserId: customerId,
        status_payment: "Belum bayar",
        status_swab: "Menunggu",
        type_swab: "PCR",
        date_swab: new Date(),
        price: 900000
      }
      return Order.create(detailOrder)
    })
    .then(order => {
      return Order.findByPk(+order.id, {
        include: [
          { model: Live_Tracking },
          {
            model: User,
            attributes: {
              exclude: ['password']
            }
          }
        ]
      })
    })
    .then(order => {
      idOrder = order.id;
      newOrder = { data: order }
      done()
    })
    .catch(err => done(err))
})

afterAll(done => {
  User.destroy({ where: { id: customerId } })
    .then(_ => Order.destroy({ where: {} }))
    .then(_ => done())
    .catch(err => done(err))
})


describe('POST /midtrans/createTransaction', () => {
  describe('Success Case', () => {
    it('201 Created - should return object with key token and redirect_url', (done) => {
      spy = jest.spyOn(snap, 'createTransaction').mockImplementation(() => (
        {
          "token": "66e4fa55-fdac-4ef9-91b5-733b97d1b862",
          "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
        }))
      request(app)
        .post('/midtrans/createTransaction')
        .set('access_token', tokenCustomer)
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(spy).toHaveBeenCalled()
            expect(res.status).toBe(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('token', expect.any(String))
            expect(res.body).toHaveProperty('redirect_url', expect.any(String))
            done()
          }
        })
    })
  })
  describe('Error Case', () => {
    it('404 Not Found - error because order id not found', (done) => {
      request(app)
        .post('/midtrans/createTransaction')
        .set('access_token', tokenCustomer)
        .send({
          data: {
            id: idNotFound,
            status_payment: 'Belum bayar',
            status_swab: 'Menunggu',
            type_swab: 'PCR',
            date_swab: '2021-08-04T09:57:53.452Z',
            price: 900000,
            UserId: 154,
            createdAt: '2021-08-04T09:57:53.452Z',
            updatedAt: '2021-08-04T09:57:53.452Z',
            Live_Tracking: null,
            User: {
              id: 154,
              name: 'Lili',
              nik: '321111111',
              role: 'Customer',
              email: 'lili@mail.com',
              address: 'Jl. Batu Gede Jakarta',
              phone_number: '085712342222',
              dob: '1995-01-07T00:00:00.000Z',
              latitude: -6.531673,
              longitude: 106.796378,
              createdAt: '2021-08-04T09:57:53.322Z',
              updatedAt: '2021-08-04T09:57:53.383Z'
            }
          }
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Order not found')
            done()
          }
        })
    })
  })
})

//notif-handling
describe('POST /midtrans/createTransaction', () => {
  describe('Success Case', () => {
    it('200 OK - should return notif from midtrans', (done) => {
      request(app)
        .post('/midtrans/notification/handling')
        .send({
          "transaction_time": "2021-08-03 07:21:47",
          "transaction_status": "settlement",
          "transaction_id": "b3a4a6e2-a837-4906-9789-ea20c7e7eb98",
          "status_message": "midtrans payment notification",
          "status_code": "200",
          "signature_key": "55f1fc29cd17014a886ec059300e5531e82fa4b4f91507359c0d376cd696e47df9043e026df8794bc8b0f01f63f6dde1640b6f89aea61c03ff0209bb9cf7ad7c",
          "settlement_time": "2021-08-03 07:21:54",
          "payment_type": "danamon_online",
          "order_id": idOrder,
          "merchant_id": "G600070340",
          "gross_amount": "900000",
          "fraud_status": "accept",
          "currency": "IDR",
          "approval_code": "esFh3x0jFpx1Y0"
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('OK', 'OK')
            done()
          }
        })
    })
  })
  describe('Error Case', () => {
    it('404 Not Found - error because order id not found', (done) => {
      request(app)
        .post('/midtrans/notification/handling')
        .set('access_token', tokenCustomer)
        .send({
          "transaction_time": "2021-08-03 07:21:47",
          "transaction_status": "settlement",
          "transaction_id": "b3a4a6e2-a837-4906-9789-ea20c7e7eb98",
          "status_message": "midtrans payment notification",
          "status_code": "200",
          "signature_key": "55f1fc29cd17014a886ec059300e5531e82fa4b4f91507359c0d376cd696e47df9043e026df8794bc8b0f01f63f6dde1640b6f89aea61c03ff0209bb9cf7ad7c",
          "settlement_time": "2021-08-03 07:21:54",
          "payment_type": "danamon_online",
          "order_id": idNotFound,
          "merchant_id": "G600070340",
          "gross_amount": "900000",
          "fraud_status": "accept",
          "currency": "IDR",
          "approval_code": "esFh3x0jFpx1Y0"
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Order not found')
            done()
          }
        })
    })
  })
})


