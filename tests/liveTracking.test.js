const request = require('supertest')
const app = require('../app')
const { Live_Tracking, User, Order, Location_Log } = require('../models')
const { hashPassword } = require('../helpers/password-helpers')
const { generateToken } = require('../helpers/token-helper')


let tokenAdmin;
let tokenCustomer;
let customerId;
let idLiveTracking;
const idNotFound = 456789;

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

const order = {
  id: 1,
  status_payment: true,
  status_swab: "positif",
  type_swab: "PCR",
  date_swab: new Date(),
  price: 175000,
  UserId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}

const liveTracking = {
  latitude: -6.531673,
  longitude: 106.796378,
  OrderId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}
const locationLog = {
  latitude: -6.531673,
  longitude: 106.796378,
  OrderId: 1,
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
      return Order.create(order);
    })
    .then(() => {
      return Location_Log.create(locationLog);
    })
    .then(() => {
      return Live_Tracking.create(liveTracking);
    })
    .then((liveTracking) => {
      idLiveTracking = liveTracking.id
      done();
    })
    .catch(err => done(err))
})

afterAll(done => {
  User.destroy({ where: { id: customerId } })
    .then(_ => Order.destroy({ where: {} }))
    .then(_ => Location_Log.destroy({ where: {} }))
    .then(_ => Live_Tracking.destroy({ where: {} }))
    .then(_ => done())
    .catch(err => done(err))
})

describe('GET /tracking/:id', () => {
  describe('Success Case', () => {
    it('200 OK - should return object of success true and data include of object location', (done) => {
      request(app)
        .get(`/tracking/${idLiveTracking}`)
        .set('access_token', tokenAdmin)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body.data).toHaveProperty('location', expect.any(Object))
            done()
          }
        })
    })
  })
  describe('Error Cases', () => {
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      request(app)
        .get(`/tracking/${idLiveTracking}`)
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
        .get(`/tracking/${idLiveTracking}`)
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
    it('404 Not Found - error because live tracking with specific id is not found', (done) => {
      request(app)
        .get(`/tracking/${idNotFound}`)
        .set("access_token", tokenAdmin)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Location not found')
            done()
          }
        })
    })

  })
})

describe('PUT /tracking/:id', () => {
  describe('Success Case', () => {
    it('200 OK - Should return object of success true and message Successfully updated live tracking', (done) => {
      request(app)
        .put(`/tracking/${idLiveTracking}`)
        .set('access_token', tokenCustomer)
        .send({
          "latitude": -6.186331,
          "longitude": 106.819939,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body).toHaveProperty('message', "Successfully updated live tracking")
            done()
          }
        })
    })
  })
  describe('Error Cases', () => {
    it('401 UnAuthenticated - error because user has not logged in', (done) => {
      request(app)
        .put(`/tracking/${idLiveTracking}`)
        .send({
          "latitude": -6.186331,
          "longitude": 106.819939
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
        .put(`/tracking/${idLiveTracking}`)
        .set("access_token", tokenAdmin)
        .send({
          "latitude": -6.186331,
          "longitude": 106.819939
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
    it('404 Not Found - error because live tracking with specific id is not found', (done) => {
      request(app)
        .put(`/tracking/${idNotFound}`)
        .set('access_token', tokenCustomer)
        .send({
          "latitude": -6.186331,
          "longitude": 106.819939
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Location not found')
            done()
          }
        })
    })
  })
})