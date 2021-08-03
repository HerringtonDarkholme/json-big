import chai from 'chai'
import JSONBig from '../index'
const {expect} = chai;

describe('Testing native BigInt support: parse', () => {
  if (typeof BigInt === 'undefined') {
    return
  }
  const input = '{"big":92233720368547758070,"small":123}'

  it('Should show JSONbig does support parsing native BigInt', (done) => {
    const instance = JSONBig({
      useNativeBigInt: true,
    })
    const obj = instance.parse(input)
    expect(obj.small, 'small int').to.equal(123)
    expect(obj.big.toString(), 'big int').to.equal('92233720368547758070')
    expect(typeof obj.big, 'big int').to.equal('bigint')
    done()
  })

  it('Should show JSONbig does support forced parsing to native BigInt', (done) => {
    const instance = JSONBig({
      alwaysParseAsBig: true,
      useNativeBigInt: true,
    })
    const obj = instance.parse(input)
    expect(obj.big.toString(), 'big int').to.equal('92233720368547758070')
    expect(typeof obj.big, 'big int').to.equal('bigint')
    expect(obj.small.toString(), 'small int').to.equal('123')
    expect(typeof obj.small, 'small int').to.equal('bigint')
    done()
  })

  it('Should show JSONbig does support native Bigint parse/stringify roundtrip', (done) => {
    const instance = JSONBig({
      useNativeBigInt: true,
    })
    const obj = instance.parse(input)
    const output = instance.stringify(obj)
    expect(output).to.equal(input)
    done()
  })

  it('Should show JSONbig does support native Bigint parse/stringify roundtrip when BigInt is forced', (done) => {
    const instance = JSONBig({
      alwaysParseAsBig: true,
      useNativeBigInt: true,
    })
    const obj = instance.parse(input)
    const output = instance.stringify(obj)
    expect(output).to.equal(input)
    done()
  })
})
