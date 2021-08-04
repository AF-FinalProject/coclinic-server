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