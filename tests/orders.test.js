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
  User.findOne({ where: { email: "admin@mail.com" } })
    .then(admin => {
      tokenAdmin = generateToken({ id: admin.id, email: admin.email, name: admin.name })
      return User.create(customer1)
    })
    .then(customer1 => {
      tokenCustomer1 = generateToken({ id: customer1.id, email: customer1.email, name: customer1.name })
      customer1Id = customer1.id;
      return User.create(customer2)
    })
    .then(customer2 => {
      tokenCustomer2 = generateToken({ id: customer2.id, email: customer2.email, name: customer2.name })
      customer2Id = customer2.id;
      done()
    })
    .catch(err => done(err))
})

afterAll(done => {
  User.destroy({ where: { id: customer1Id } })
    .then(_ => User.destroy({ where: { id: customer2Id } }))
    .then(_ => Order.destroy({ where: {} }))
    .then(_ => done())
    .catch(err => done(err))
})


describe('POST /orders', () => {
  // sukses dengan role customer
  describe('Success Case', () => {
    it('201 Created - should return object of success true and message Successfully placed order', (done) => {
      const newOrder = {
        date_swab: new Date(),
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
            expect(res.body).toHaveProperty('success', true)
            expect(res.body).toHaveProperty('message', 'Successfully placed order')
            done()
          }
        })
    })
  })
  // error add order
  describe('Error Case', () => {
    // has not logged in
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      const newOrder = {
        date_swab: new Date(),
      }
      request(app)
        .post('/orders')
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('UnAuthenticated - You are not logged in')
            done()
          }
        })
    })
    //unauthorized, not customer token
    it('403 UnAuthorized - error because user is not customer', (done) => {
      const newOrder = {
        date_swab: new Date(),
      }
      request(app)
        .post('/orders')
        .set("access_token", tokenAdmin)
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('UnAuthorized - Access is denied')
            done()
          }
        })
    })
    //date swab is null
    it('400 bad Request - error because req body does not have date_swab ', (done) => {
      const newOrder = {
      }
      request(app)
        .post('/orders')
        .set("access_token", tokenCustomer1)
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Swab date must not be null')
            done()
          }
        })
    })
  })
})

// fethAllCustomer
describe('GET /orders/customers', () => {
  describe('Success Case', () => {
    it('200 OK - should return object of success true and data include array of orders that belongs to logged in user', (done) => {
      request(app)
        .get('/orders/customers')
        .set('access_token', tokenCustomer1)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body.data).toHaveProperty('orders', expect.any(Array))
            done()
          }
        })
    })
  })
   describe('Error Cases', () => {
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      request(app)
        .post('/orders')
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('UnAuthenticated - You are not logged in')
            done()
          }
        })
    })
    //unauthorized, not customer token
    it('403 UnAuthorized - error because user is not customer', (done) => {
      request(app)
        .post('/orders')
        .set("access_token", tokenAdmin)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('UnAuthorized - Access is denied')
            done()
          }
        })
    })
  
   })
})

//fetchAllAdmin
describe('GET /orders/admin', () => {
  describe('Success Case', () => {
    it('200 OK - should return object of success true and data include array of all orders in database', (done) => {
      request(app)
        .get('/orders/admin')
        .set('access_token', tokenAdmin)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body.data).toHaveProperty('orders', expect.any(Array))
            done()
          }
        })
    })
  })
   describe('Error Cases', () => {
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      request(app)
        .get('/orders/admin')
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('UnAuthenticated - You are not logged in')
            done()
          }
        })
    })
    //unauthorized, not customer token
    it('403 UnAuthorized - error because user is not admin', (done) => {
      request(app)
        .get('/orders/admin')
        .set("access_token", tokenCustomer1)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('UnAuthorized - Access is denied')
            done()
          }
        })
    })
  
   })
})

//getDetailOrder
//Put order
//delete order





