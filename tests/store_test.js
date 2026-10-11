import Store from '../src/store.js'

const store = new Store()

console.log(store.ping())
console.log(store.set('sulfurcodes', '19'))
console.log(store.get('sulfurcodes'))
console.log(store.exists('sulfurcodes'))
console.log(store.delete('sulfurcodes'))
console.log(store.exists('sulfurcodes'))