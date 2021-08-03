const mocha = require('mocha')
const { assert } = require('chai')
const { expect } = require('chai')
const BigNumber = require('bignumber.js')

describe('Testing native BigInt support: parse', () => {
  if (typeof BigInt === 'undefined') {
    console.log('No native BigInt')
    return
  }
  const input = '{"big":92233720368547758070,"small":123}'

  it('Should show JSONbig does support parsing native BigInt', (done) => {
    const JSONbig = require('../index')({
      useNativeBigInt: true,
    })
    const obj = JSONbig.parse(input)
    expect(obj.small, 'small int').to.equal(123)
    expect(obj.big.toString(), 'big int').to.equal('92233720368547758070')
    expect(typeof obj.big, 'big int').to.equal('bigint')
    done()
  })

  it('Should show JSONbig does support forced parsing to native BigInt', (done) => {
    const JSONbig = require('../index')({
      alwaysParseAsBig: true,
      useNativeBigInt: true,
    })
    const obj = JSONbig.parse(input)
    expect(obj.big.toString(), 'big int').to.equal('92233720368547758070')
    expect(typeof obj.big, 'big int').to.equal('bigint')
    expect(obj.small.toString(), 'small int').to.equal('123')
    expect(typeof obj.small, 'small int').to.equal('bigint')
    done()
  })

  it('Should show JSONbig does support native Bigint parse/stringify roundtrip', (done) => {
    const JSONbig = require('../index')({
      useNativeBigInt: true,
    })
    const obj = JSONbig.parse(input)
    const output = JSONbig.stringify(obj)
    expect(output).to.equal(input)
    done()
  })

  it('Should show JSONbig does support native Bigint parse/stringify roundtrip when BigInt is forced', (done) => {
    const JSONbig = require('../index')({
      alwaysParseAsBig: true,
      useNativeBigInt: true,
    })
    const obj = JSONbig.parse(input)
    const output = JSONbig.stringify(obj)
    expect(output).to.equal(input)
    done()
  })
})
