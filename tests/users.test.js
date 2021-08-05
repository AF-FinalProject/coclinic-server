const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { hashPassword } = require('../helpers/password-helpers');
const { generateToken } = require('../helpers/token-helper');

let adminToken;
let adminCustomer;

const userCustomer = {
  name: 'User Customer Test',
  nik: '45678910',
  email: 'testCustomer@mail.com',
  password: hashPassword('lala123'),
  address: 'Jl. Batu Gede Bogor',
  phone_number: '085712345678',
  dob: '1993-01-09',
  latitude: -6.531673,
  longitude: 106.796378,
}

const { name, nik, email, password, address, phone_number, dob, latitude, longitude } = userCustomer
const admin = {
  email: 'admin@mail.com',
  password: '123456'
}

beforeAll(done => {
  User.findOne({ where: { email: admin.email } })
    .then(user => {
      adminToken = generateToken({ id: user.id, email: user.email, name: user.name })
      done()
    })
    .catch(err => done(err))
})


afterAll(done => {
  User.destroy({
    where: { email: userCustomer.email }
  })
    .then(() => done())
    .catch(err => done(err))
})



describe('POST /register', () => {
  describe('Success Case', () => {
    it('201 Created - should return object with success true and message Successfully Added User', (done) => {
      request(app)
        .post('/register')
        .send(userCustomer)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('status', true)
            expect(res.body).toHaveProperty('message', 'Successfully Added User')
            done()
          }
        })
    })
  })

  describe('Error Cases', () => {
    it('400 Bad Request- error SequelizeValidationError, because name is empty', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name: "",
          password, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Name must not be empty')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because name is null', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com',
          password, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Name must not be null')
            done()
          }
        })
    })

    it('400 Bad Request- error SequelizeValidationError, because NIK is empty', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, nik: "", address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('NIK must not be empty')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because NIK is null', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('NIK must not be null')
            done()
          }
        })
    })

    it('400 Bad Request -  error because SequelizeUniqueConstraintError, email is already exist in database or email must be unique', (done) => {
      request(app)
        .post('/register')
        .send({
          email: userCustomer.email,
          password, name, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual(`${userCustomer.email} is already exist`)
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError because invalid format email', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'doni.com',
          password, name, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Invalid email address')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because email is empty', (done) => {
      request(app)
        .post('/register')
        .send({
          email: '',
          password, name, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Email must not be empty')
            expect(res.body.message[1]).toEqual('Invalid email address')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because email is null', (done) => {
      request(app)
        .post('/register')
        .send({
          password, name, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Email must not be null')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because password is empty', (done) => {
      request(app)
        .post('/register')
        .send({
          email: "lili@mail.com", password: '', name, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Password must not be empty')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because password is null', (done) => {
      request(app)
        .post('/register')
        .send({
          email: "lili@mail.com", name, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Password must not be null')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because password is less than 6 character', (done) => {
      request(app)
        .post('/register')
        .send({
          email: "lili@mail.com", password: 'pas12', name, nik, address, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Password must be at least 6 characters')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because address is empty', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, address: "", nik, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Address must not be empty')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because address is null', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, nik, phone_number, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Address must not be null')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because phone_number is empty', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, address, nik, phone_number: "", dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Phone Number must not be empty')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because phone_number is null', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, nik, address, dob, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Phone Number must not be null')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because date of birth is empty', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, address, nik, phone_number, dob: "", latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Date of Birth must not be empty')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because date of birth is null', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, nik, address, phone_number, latitude, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Date of Birth must not be null')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because invalid format date of birth', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name, dob: "2021-07-32",
          password, nik, address, phone_number, latitude, longitude,
        })
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
    it('400 Bad Request- error SequelizeValidationError, because invalid latitude', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, address, nik, phone_number, dob, latitude: "", longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Invalid latitude')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because latitude is null', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, nik, dob, address, phone_number, longitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Latitude must not be null')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because invalid longitude', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, address, nik, phone_number, dob, longitude: "", latitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Invalid longitude')
            done()
          }
        })
    })
    it('400 Bad Request- error SequelizeValidationError, because longitude is null', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'lili@mail.com', name,
          password, nik, dob, address, phone_number, latitude,
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Longitude must not be null')
            done()
          }
        })
    })
  })
})

describe('POST /login', () => {
  describe('Success Case Admin', () => {
    it('200 OK - should return object with success true and access_token', (done) => {
      request(app)
        .post('/login')
        .send({
          email: admin.email,
          password: admin.password
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('status', true)
            expect(res.body).toHaveProperty('access_token', expect.any(String))
            done()
          }
        })
    })
  })

  describe('Error Case Admin', () => {
    it('400 Bad Request - error because invalid email', (done) => {
      request(app)
        .post('/login')
        .send({
          email: "admi@mail.com",
          password: admin.password
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Invalid email or password')
            done()
          }
        })
    })

    it('400 Bad Request - error because invalid password', (done) => {
      request(app)
        .post('/login')
        .send({
          email: admin.email,
          password: "salah"
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Invalid email or password')
            done()
          }
        })
    })
  })

  describe('Success Case Customer', () => {
    it('200 OK - should return object with success true and access_token', (done) => {
      request(app)
        .post('/login')
        .send({
          email: userCustomer.email,
          password: userCustomer.password
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            customerToken = res.body.access_token
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('status', true)
            expect(res.body).toHaveProperty('access_token', expect.any(String))
            done()
          }
        })
    })
  })

  describe('Error Case Customer', () => {
    it('400 Bad Request - error because invalid email', (done) => {
      request(app)
        .post('/login')
        .send({
          email: "testCusto@mail.com",
          password: userCustomer.password
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Invalid email or password')
            done()
          }
        })
    })

    it('400 Bad Request - error because invalid password', (done) => {
      request(app)
        .post('/login')
        .send({
          email: userCustomer.email,
          password: "salahPass"
        })
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.message[0]).toEqual('Invalid email or password')
            done()
          }
        })
    })
  })
})


describe('GET /customers', () => {
  describe('Success Case', () => {
    it('200 OK - should return object with success true and data customers', (done) => {
      request(app)
        .get('/customers')
        .set('access_token', adminToken)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('success', true)
            expect(res.body.data).toHaveProperty('customers', expect.any(Array))
            done()
          }
        })
    })
  })

  describe('Error Cases', () => {
    it('401 Bad Request - error because user has not logged in', (done) => {
      request(app)
        .get('/customers')
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

    it('403 UnAuthorized - error because token is not admin role', (done) => {
      request(app)
        .get('/customers')
        .set('access_token',customerToken)
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
