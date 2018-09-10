import toolkit from './toolkit'
import './index.less'

class Tetris {
  constructor(type) {
    return this.createBlock(type)
  }
  createBlock(type) {
    let block
    switch(type) {
      case 1:
        block = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
        break;
      case 2:
        block = [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ]
        break;
    }
    return block
  }
}

class Game {
  constructor() {
    this.init()
  }
  init() {
    this.appContainer = document.getElementById('app')
    this.data = toolkit.createTetrisArray(20, 10, 0)
    console.log(this.data)
    this.createBlocks()
    this.addBlocks()
    this.changeBlocks()
  }
  createBlocks() {
    const leftView = document.createElement('div')
    leftView.className = 'left-view'
    this.leftView = leftView
    this.blocks = toolkit.createTetrisArray()
    for (let i = 0; i < this.data.length; i++) {
      const element = this.data[i];
      for (let j = 0; j < element.length; j++) {
        const item = element[j];
        const node = document.createElement('div')
        node.className = 'default'
        this.leftView.appendChild(node)
        this.blocks[i][j] = node
      }
    }
    this.appContainer.appendChild(this.leftView)
  }
  changeBlocks() {
    for (let i = 0; i < this.data.length; i++) {
      const element = this.data[i];
      for (let j = 0; j < element.length; j++) {
        const item = element[j];
        this.blocks[i][j].className = item === 1 ? 'alive' : 'default'
      }
    }
  }
  addBlocks() {
    const blocks = new Tetris(1)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.data[i][j+3] = blocks[i][j]        
      }
    }
  }
  createBlock() {
    const blocks = toolkit.createTetrisArray(4, 4, 1)
  }
}

const game = new Game()