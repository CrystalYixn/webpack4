console.log(__dirname)
// require('./index.css')
require('@babel/polyfill')

function * fn1() {
  yield 1
}
class Person {
  name = 'whh'
}
console.log(new Person().name)
console.log(fn1().next())
console.log('foobar'.includes('foo'))