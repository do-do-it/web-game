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
    this.next = this.createTetries()
    this.current = this.createTetries()
    this.nextDivs = []
    this.init()
  }
  init() {
    this.gameDivs = this.initView('game-view', this.gameData)
    this.nextDivs = this.initView('next-view', this.next.data())
    this.initController()
    this.gameMove()
  }
  gameMove() {
    const data = this.current.data()
    const origin = this.current.origin
    const gameData = JSON.parse(JSON.stringify(this.gameData))
    const row = gameData.length
    for (let i = 0; i < data.length; i++) {
      if (i + origin.x >= row) {
        continue
      }
      for (let j =0; j < data[0].length; j++) {
        gameData[i + origin.x][j + origin.y] = data[i][j]
      }
    }
    this.refreshDivs(this.gameDivs, gameData)
  }
  createTetries() {
    const type = this.ranNum(1, 6)
    const dir = this.ranNum(0, 3)
    return new Tetries(type, dir)
  }
  ranNum(min, max) {
    return Math.ceil(Math.random()*(max - min)) + min
  }
  initController() {
    const container = document.createElement('div')
    container.className = 'controller-view'
    const dirs = ['left', 'down', 'right', 'up']
    for (let i = 0; i < dirs.length; i++) {
      const node = document.createElement('div')
      node.id = dirs[i]
      node.className = dirs[i]
      container.appendChild(node)
    }
    document.querySelector('body').appendChild(container)

    document.getElementById('left').addEventListener('click', () => {
      if (this.current.left(this.gameData)) {
        this.gameMove()
      }
    }, false)
    document.getElementById('down').addEventListener('click', () => {
      if (this.current.down(this.gameData)) {
        this.gameMove()
      }
    }, false)
    document.getElementById('right').addEventListener('click', () => {
      if (this.current.right(this.gameData)) {
        this.gameMove()
      }
    }, false)
    document.getElementById('up').addEventListener('click', () => {
      this.current.up()
      this.gameMove()
    }, false)
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 37 && this.current.left(this.gameData)) this.gameMove()
      if (event.keyCode === 38 && this.current.up()) this.gameMove()
      if (event.keyCode === 39 && this.current.right(this.gameData)) this.gameMove()
      if (event.keyCode === 40 && this.current.down(this.gameData)) this.gameMove()
    }, false)
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