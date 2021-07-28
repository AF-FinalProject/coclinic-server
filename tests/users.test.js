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
  createdAt: new Date(),
  updatedAt: new Date()
}

afterAll(done => {
  User.destroy({
    where: { email: userCustomer.email }
  })
    .then(() => done())
    .catch(err => done(err))
})



describe('POST /register', () => {
  describe('Success Cases', () => {
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
})
