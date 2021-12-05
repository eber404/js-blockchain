import crypto from 'crypto'

export class Block {
  public index: number
  public currentHash: string
  public previousHash: string
  public timestamp = Date.now()
  public data: any
  public difficulty: number
  public nonce: number

  constructor(
    index = 0,
    previousHash = '',
    data = 'sou o block genesis',
    difficulty = 1
  ) {
    this.index = index
    this.previousHash = previousHash
    this.data = data
    this.currentHash = this.generateHash()
    this.difficulty = difficulty
    this.nonce = 0

    this.mine()
  }

  generateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.previousHash.toString() +
          JSON.stringify(this.data) +
          this.timestamp +
          this.nonce
      )
      .digest('hex')
  }

  mine() {
    this.currentHash = this.generateHash()

    while (!/^0*$/.test(this.currentHash.substring(0, this.difficulty))) {
      console.log('Mining hash', this.currentHash)
      this.nonce++
      this.currentHash = this.generateHash()
    }
  }
}
