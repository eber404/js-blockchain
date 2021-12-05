import { Blockchain } from './Blockchain'

const blockchain = new Blockchain()
blockchain.addBlock({ amount: 4 })
blockchain.addBlock({ amount: 50 })

console.time()

console.log(blockchain.isValid()) // true
blockchain.blocks[1].data.amount = 30000 // ataque malicioso
console.log(blockchain.isValid()) // false

console.timeEnd()
