/* eslint-env jasmine */
var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Customers API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create customer', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/customers', {
        name: 'customer name'
      })
      .reply(200, {})

    client.customers.create({
      name: 'customer name'
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should get customer', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/customers/cust_test-id')
      .reply(200, {})

    client.customers.get('cust_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update customer', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/customers/cust_test-id', {
        name: 'customer name'
      })
      .reply(200, {})

    client.customers.update({
      id: 'cust_test-id',
      name: 'customer name'
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should delete customer', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/customers/cust_test-id')
      .reply(200, {})

    client.customers.delete('cust_test-id')
    .then(function () {
      server.done()
      done()
    })
  })
})
