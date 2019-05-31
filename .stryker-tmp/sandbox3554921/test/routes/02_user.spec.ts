'use strict'

import * as chai from 'chai'
import 'mocha'
import app from '../../src/app'
import { UserModel } from '../../src/schemas/user.schema'
import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const user = {
  username: 'John',
  firstName: 'John',
  lastName: 'Doe',
  email: 'jhon@myemail.com',
  password: 'password',
  phone: '5555555',
  userStatus: 1,
}

describe('userRoute', () => {
  before(async () => {
    expect(UserModel.modelName).to.be.equal('User')
    UserModel.collection.drop()
  })
  it('should respond with HTTP 404 status because there is no user', async () => {
    return chai
      .request(app)
      .get(`/users/${user.username}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should create a new user and retrieve it back', async () => {
    return chai
      .request(app)
      .post('/users/')
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body.username).to.be.equal(user.username)
      })
  })
  it('should return the user created on the step before', async () => {
    return chai
      .request(app)
      .get(`/users/${user.username}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.username).to.be.equal(user.username)
      })
  })
  it('should updated the user Jhon', async () => {
    user.username = 'Jhon Updated'
    user.firstName = 'Jhon Updated'
    user.lastName = 'Doe Updated'
    user.email = 'jhon@myemail_updated.com'
    user.password = 'password Updated'
    user.phone = '3333333'
    user.userStatus = 12
    return chai
      .request(app)
      .patch(`/users/Jhon`)
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return the user updated on the step before', async () => {
    return chai
      .request(app)
      .get(`/users/${user.username}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.username).to.be.equal(user.username)
        expect(res.body.firstName).to.be.equal(user.firstName)
        expect(res.body.lastName).to.be.equal(user.lastName)
        expect(res.body.email).to.be.equal(user.email)
        expect(res.body.password).to.be.equal(user.password)
        expect(res.body.phone).to.be.equal(user.phone)
        expect(res.body.userStatus).to.be.equal(user.userStatus)
      })
  })
  it('should return 404 because the user does not exist', async () => {
    user.firstName = 'Mary Jane'
    return chai
      .request(app)
      .patch(`/users/Mary`)
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should remove an existent user', async () => {
    return chai
      .request(app)
      .del(`/users/${user.username}`)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return 404 when it is trying to remove an user because the user does not exist', async () => {
    return chai
      .request(app)
      .del(`/users/Mary`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
})
