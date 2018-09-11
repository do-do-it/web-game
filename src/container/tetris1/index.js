import toolkit from './toolkit'
import Tetries from './tetries'
import './index.less'

class Game {
  constructor() {
    this.col = 10
    this.row = 20
    this.gameData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    this.gameDivs = []
    this.className = ['none', 'fixed', 'alive']
    this.next = new Tetries(1, 1)
    this.current = new Tetries(1, 2)
    this.nextDivs = []
    this.init()
  }
  init() {
    this.gameDivs = this.initView('game-view', this.gameData)
    this.nextDivs = this.initView('next-view', this.next.data[this.next.dir])
    // setInterval(() => {
    //   const data = this.current.data[this.current.dir]
    //   const origin = this.current.origin
    //   const gameData = JSON.parse(JSON.stringify(this.gameData))
    //   for (let i = 0; i < data.length; i++) {
    //     for (let j =0; j < data[0].length; j++) {
    //       gameData[i + origin.x][j + origin.y] = data[i][j]
    //     }
    //   }
    //   console.log(gameData)
    //   this.refreshDivs(this.gameDivs, gameData)
    //   this.current.origin.x += 1
    //   if (this.current.origin.x >= this.row - 4) {
    //     this.current.origin.x = this.row - 4
    //   }
    // }, 200)
  }
  initView(containerName, data) {
    const blockdDivs = []
    const container = document.createElement('div')
    container.className = containerName
    for (let i = 0; i < data.length; i++) {
      const divs = []
      for (let j = 0; j < data[0].length; j++) {
        const node = document.createElement('div')
        node.className = this.className[data[i][j]]
        container.appendChild(node)
        divs.push(node)
      }
      blockdDivs.push(divs)
    }
    document.querySelector('body').appendChild(container)
    return blockdDivs
  }
  refreshDivs(divs, data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        divs[i][j].className = this.className[data[i][j]]
      }
    }
  }
}

const game = new Game()