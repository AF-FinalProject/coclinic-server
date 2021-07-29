const request = require('supertest')
const app = require('../app')
const { Order, User } = require('../models')
const { hashPassword } = require('../helpers/password-helpers')
const { generateToken } = require('../helpers/token-helper')

let tokenAdmin;
let tokenCustomer1;
let tokenCustomer2;
let customer1Id;
let customer2Id;
let idOrder;


const customer1 = {
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

const customer2 = {
  name: 'Lele',
  nik: '321444444',
  email: 'lele@mail.com',
  password: hashPassword('lele123'),
  address: 'Jl. Angkasa Bandung',
  phone_number: '085712342222',
  dob: '1995-01-07',
  latitude: -6.531673,
  longitude: 106.796378,
  createdAt: new Date(),
  updatedAt: new Date()
}

beforeAll(done => {
  User.create(customer1)
    .then(customer1 => {
      tokenCustomer1 = generateToken({ id: customer1.id, email: customer1.email, name: customer1.name })
      customer1Id = customer1.id;
      return User.create(customer2)
    })
    .then(customer2 => {
      tokenCustomer2 = generateToken({ id: customer2.id, email: customer2.email, name: customer2.name })
      customer2Id = customer2.id;
    })
    .catch(err => done(err))
})

afterAll(done => {
  User.destroy({ where: { id: customer1Id } })
    .then(_ => User.destroy({ where: { id: customer2Id } }))
    .catch(err => done(err))
})

// post order
// success
//res.status(201).json({success: true, message:"Successfully placed order"})
//error: jika bukan customer  role
describe('POST /orders', () => {
  describe('Success Case', () => {
    it('201 Created - should return object of success true and message Successfully placed order', (done) => {
      const newOrder = {
        date_swab: new Date(),
        UserId: customer1Id
      }
      request(app)
        .post('/orders')
        .set('access_token', tokenCustomer1)
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            idOrder = res.body.id;
            expect(res.status).toBe(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('status', true)
            expect(res.body).toHaveProperty('message', 'Successfully placed order')
            done()
          }
        })
    })
  })
})








