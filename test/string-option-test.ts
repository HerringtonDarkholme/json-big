const mocha = require('mocha')
const { assert } = require('chai')
const { expect } = require('chai')

describe("Testing 'storeAsString' option", () => {
  const key = '{ "key": 12345678901234567 }'
  it('Should show that the key is of type object', (done) => {
    const JSONbig = require('../index')
    const result = JSONbig.parse(key)
    expect(typeof result.key).to.equal('object')
    done()
  })

  it('Should show that key is of type string, when storeAsString option is true', (done) => {
    const JSONstring = require('../index')({ storeAsString: true })
    const result = JSONstring.parse(key)
    expect(typeof result.key).to.equal('string')
    done()
  })
})
