import chai from 'chai'
import JSONBig from '../index'
const {expect} = chai;

describe("Testing 'storeAsString' option", () => {
  const key = '{ "key": 12345678901234567 }'
  it('Should show that the key is of type object', (done) => {
    const result = JSONBig.parse(key)
    expect(typeof result.key).to.equal('object')
    done()
  })

  it('Should show that key is of type string, when storeAsString option is true', (done) => {
    const JSONstring = JSONBig({ storeAsString: true })
    const result = JSONstring.parse(key)
    expect(typeof result.key).to.equal('string')
    done()
  })
})
