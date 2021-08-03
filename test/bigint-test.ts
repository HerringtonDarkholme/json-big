const mocha = require('mocha')
const { assert } = require('chai')
const { expect } = require('chai')
const BigNumber = require('bignumber.js')

describe('Testing bigint support', () => {
  const input = '{"big":9223372036854775807,"small":123}'

  it('Should show classic JSON.parse lacks bigint support', (done) => {
    const obj = JSON.parse(input)
    expect(obj.small.toString(), 'string from small int').to.equal('123')
    expect(obj.big.toString(), 'string from big int').to.not.equal(
      '9223372036854775807',
    )

    const output = JSON.stringify(obj)
    expect(output).to.not.equal(input)
    done()
  })

  it('Should show JSONbig does support bigint parse/stringify roundtrip', (done) => {
    const JSONbig = require('../index')
    const obj = JSONbig.parse(input)
    expect(obj.small.toString(), 'string from small int').to.equal('123')
    expect(obj.big.toString(), 'string from big int').to.equal(
      '9223372036854775807',
    )
    expect(obj.big, 'instanceof big int').to.be.instanceof(BigNumber)

    const output = JSONbig.stringify(obj)
    expect(output).to.equal(input)
    done()
  })
})
