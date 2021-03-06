const process = require('process')

const assert = require('assert')

const slsk = require('../lib/index.js')

describe('login', () => {

  it('must have env vars', (done) => {
    assert.equal(typeof process.env.SLSK_USER, 'string')
    assert.equal(typeof process.env.SLSK_PASS, 'string')
    done()
  })

  it('must login', (done) => {
    slsk.connect({
      user: process.env.SLSK_USER,
      pass: process.env.SLSK_PASS
    }, (err, res) => {
      done(err)
    })
  })

  it('must close socket', () => {
    slsk.disconnect()
  })

  it('must not login', (done) => {
    slsk.connect({
      user: 'IAmWebServer',
      pass: 'IAmInvalidPassword'
    }, (err, res) => {
      assert.equal(err.message, 'INVALIDPASS')
      done()
    })
  })

})
