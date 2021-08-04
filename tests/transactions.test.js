const request = require('supertest')
const app = require('../app')
const { Order, User, Transaction, Live_Tracking } = require('../models')
const { hashPassword } = require('../helpers/password-helpers')
const { generateToken } = require('../helpers/token-helper')
const snap = require('../helpers/snap-midtrans');



let tokenAdmin;
let tokenCustomer;
let customerId;
let newOrder;

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
      const spy = jest.spyOn(snap, 'createTransaction').mockImplementation(() => (
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
})



