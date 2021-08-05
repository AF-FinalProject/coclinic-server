const request = require('supertest')
const app = require('../app')
const { Order, User } = require('../models')
const { hashPassword } = require('../helpers/password-helpers')
const { generateToken } = require('../helpers/token-helper')

let tokenAdmin;
let tokenCustomer;
let customerId;
let idOrder;
const idNotFound = 12324444;


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
  User.findOne({ where: { email: "admin@mail.com" } })
    .then(admin => {
      tokenAdmin = generateToken({ id: admin.id, email: admin.email, name: admin.name })
      return User.create(customer)
    })
    .then(customer => {
      tokenCustomer = generateToken({ id: customer.id, email: customer.email, name: customer.name })
      customerId = customer.id;
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


describe('POST /orders', () => {
  describe('Success Case', () => {
    it('201 Created - should return object of success true and message Successfully placed order', (done) => {
      const newOrder = {
        date_swab: new Date(),
      }
      request(app)
        .post('/orders')
        .set('access_token', tokenCustomer)
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            idOrder = res.body.order.id;
            expect(res.status).toBe(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body).toHaveProperty('message', 'Successfully placed order')
            expect(res.body).toHaveProperty('order', expect.any(Object))
            done()
          }
        })
    })
  })
  describe('Error Case', () => {
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
    it('400 Bad Request - error because req body does not have date_swab ', (done) => {
      const newOrder = {
      }
      request(app)
        .post('/orders')
        .set("access_token", tokenCustomer)
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
    it('400 Bad Request - error because date_swab is empty ', (done) => {
      const newOrder = { date_swab: "" }
      request(app)
        .post('/orders')
        .set("access_token", tokenCustomer)
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Swab date must not be empty')
            done()
          }
        })
    })
    it('400 Bad Request - error because date_swab must not be before than today', (done) => {
      const newOrder = { date_swab: "2021-06-03" }
      request(app)
        .post('/orders')
        .set("access_token", tokenCustomer)
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Swab Date must not be before than today')
            done()
          }
        })
    })
    it('400 Bad Request - error because invalid date_swab', (done) => {
      const newOrder = { date_swab: "2021-07-35" }
      request(app)
        .post('/orders')
        .set("access_token", tokenCustomer)
        .send(newOrder)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Invalid date')
            done()
          }
        })
    })
  })
})

describe('GET /orders/customers', () => {
  describe('Success Case', () => {
    it('200 OK - should return object of success true and data include array of orders that belongs to logged in user', (done) => {
      request(app)
        .get('/orders/customers')
        .set('access_token', tokenCustomer)
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
    it('403 UnAuthorized - error because user is not admin', (done) => {
      request(app)
        .get('/orders/admin')
        .set("access_token", tokenCustomer)
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

describe('GET /orders/:id', () => {
  describe('Success Case', () => {
    it('200 OK - should return object of success true and data include of object orders', (done) => {
      request(app)
        .get(`/orders/${idOrder}`)
        .set('access_token', tokenAdmin)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body.data).toHaveProperty('order', expect.any(Object))
            done()
          }
        })
    })
  })
  describe('Error Cases', () => {
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      request(app)
        .get(`/orders/${idOrder}`)
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
    it('403 UnAuthorized - error because user is not admin', (done) => {
      request(app)
        .get(`/orders/${idOrder}`)
        .set("access_token", tokenCustomer)
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
    it('404 Not Found - error because order with the specific id not found', (done) => {
      request(app)
        .get(`/orders/${idNotFound}`)
        .set('access_token', tokenAdmin)
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

describe('PUT /orders/:id', () => {
  describe('Success Case', () => {
    it('200 OK - should return object of success true and message Successfully updated orders', (done) => {
      request(app)
        .put(`/orders/${idOrder}`)
        .set('access_token', tokenAdmin)
        .send({
          status_swab: "Positif"
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body).toHaveProperty('message', "Successfully updated order")
            done()
          }
        })
    })
  })
  describe('Error Cases', () => {
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      request(app)
        .put(`/orders/${idOrder}`)
        .send({
          status_swab: "Positif"
        })
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
    it('403 UnAuthorized - error because user is not admin', (done) => {
      request(app)
        .put(`/orders/${idOrder}`)
        .set("access_token", tokenCustomer)
        .send({
          status_swab: "Positif"
        })
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
    it('404 Not Found - error because order with the specific id not found', (done) => {
      request(app)
        .put(`/orders/${idNotFound}`)
        .set('access_token', tokenAdmin)
        .send({
          status_swab: "Positif"
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

describe('DELETE /orders/:id', () => {
  describe('Success Case', () => {
    it('200 OK - should return object of success true and message Successfully updated orders', (done) => {
      request(app)
        .delete(`/orders/${idOrder}`)
        .set('access_token', tokenAdmin)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body).toHaveProperty('message', "Successfully deleted order")
            done()
          }
        })
    })
  })
  describe('Error Cases', () => {
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      request(app)
        .delete(`/orders/${idOrder}`)
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
    it('403 UnAuthorized - error because user is not admin', (done) => {
      request(app)
        .delete(`/orders/${idOrder}`)
        .set("access_token", tokenCustomer)
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
    it('404 Not Found - error because order with the specific id not found', (done) => {
      request(app)
        .delete(`/orders/${idNotFound}`)
        .set('access_token', tokenAdmin)
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

describe('GET /orders/admin/:id', () => {
  describe('Success Case', () => {
    it('200 OK - should return object of success true and data', (done) => {
      request(app)
        .get(`/orders/admin/${idOrder}`)
        .set('access_token', tokenAdmin)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body).toHaveProperty('data', expect.any(Object))
            done()
          }
        })
    })
  })
  describe('Error Cases', () => {
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      request(app)
        .get(`/orders/admin/${idOrder}`)
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
    it('403 UnAuthorized - error because user is not admin', (done) => {
      request(app)
        .get(`/orders/admin/${idOrder}`)
        .set("access_token", tokenCustomer)
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




