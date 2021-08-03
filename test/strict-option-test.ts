const mocha = require('mocha')
const { assert } = require('chai')
const { expect } = require('chai')

describe("Testing 'strict' option", () => {
  const dupkeys = '{ "dupkey": "value 1", "dupkey": "value 2"}'
  it('Should show that duplicate keys just get overwritten by default', (done) => {
    const JSONbig = require('../index')
    let result = 'before'
    function tryParse() {
      result = JSONbig.parse(dupkeys)
    }
    expect(tryParse).to.not.throw('anything')
    expect(result.dupkey).to.equal('value 2')
    done()
  })

  it("Should show that the 'strict' option will fail-fast on duplicate keys", (done) => {
    const JSONstrict = require('../index')({ strict: true })
    let result = 'before'
    function tryParse() {
      result = JSONstrict.parse(dupkeys)
    }

    expect(tryParse).to.throw('Duplicate key "dupkey"')
    expect(result).to.equal('before')
    done()
  })
})
