const mocha = require('mocha')
const { assert } = require('chai')
const { expect } = require('chai')
const BigNumber = require('bignumber.js')

describe('Testing native BigInt support: stringify', () => {
  if (typeof BigInt === 'undefined') {
    console.log('No native BigInt')
    return
  }
  it('Should show JSONbig can stringify native BigInt', (done) => {
    const JSONbig = require('../index')
    const obj = {
      // We cannot use n-literals - otherwise older NodeJS versions fail on this test
      big: eval('123456789012345678901234567890n'),
      small: -42,
      bigConstructed: BigInt(1),
      smallConstructed: Number(2),
    }
    expect(obj.small.toString(), 'string from small int').to.equal('-42')
    expect(obj.big.toString(), 'string from big int').to.equal(
      '123456789012345678901234567890',
    )
    expect(typeof obj.big, 'typeof big int').to.equal('bigint')

    const output = JSONbig.stringify(obj)
    expect(output).to.equal(
      '{'
        + '"big":123456789012345678901234567890,'
        + '"small":-42,'
        + '"bigConstructed":1,'
        + '"smallConstructed":2'
        + '}',
    )
    done()
  })
})
