const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { hashPassword } = require('../helpers/password-helpers')

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

const admin = {
  email: 'admin@mail.com',
  password: '123456'
}
afterAll(done => {
  User.destroy({
    where: { email: userCustomer.email }
  })
    .then(() => done())
    .catch(err => done(err))
})



describe('POST /register', () => {
  // success
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

  //error
  describe('Error Cases', () => {
    it('400 Bad Request -  error because SequelizeUniqueConstraintError, email is already exist in database or email must be unique', (done) => {
      request(app)
        .post('/register')
        .send({
          email: userCustomer.email,
          password: 'password',
          name: userCustomer.name,
          nik: userCustomer.nik,
          address: userCustomer.address,
          phone_number: userCustomer.phone_number,
          dob: userCustomer.dob,
          latitude: userCustomer.latitude,
          longitude: userCustomer.longitude,
          createdAt: new Date(),
          updatedAt: new Date()
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
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('status', true)
            expect(res.body).toHaveProperty('access_token', expect.any(String))
            done()
          }
        })
    })
  })
})
