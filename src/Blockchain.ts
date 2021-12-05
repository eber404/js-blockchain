import { Block } from './Block'

const DIFFICULTY_LEVEL = 1

export class Blockchain {
  public blocks: Block[]
  private index: number
  private difficulty: number

  constructor(difficulty = DIFFICULTY_LEVEL) {
    this.blocks = [new Block()]
    this.index = 1
    this.difficulty = difficulty
  }

  getLastestBlock() {
    return this.blocks[this.blocks.length - 1]
  }

  addBlock(data: any) {
    const index = this.index
    const difficulty = this.difficulty
    const previousHash = this.getLastestBlock().currentHash

    const block = new Block(index, previousHash, data, difficulty)

    this.index++
    this.blocks.push(block)
  }

  isValid() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i]
      const previousBlock = this.blocks[i - 1]

      const isValid =
        currentBlock.currentHash === currentBlock.generateHash() &&
        currentBlock.index === previousBlock.index + 1 &&
        currentBlock.previousHash === previousBlock.currentHash

      return isValid
    }
  }
}
