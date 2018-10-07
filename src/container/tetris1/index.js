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
    this.initShowView()
    this.initController()
    this.gameMove()
    this.autoDown()
  }
  // 创建新的方块
  createTetries() {
    const type = this.ranNum(1, 6)
    const dir = this.ranNum(0, 3)
    return new Tetries(type, dir)
  }
  // 随机范围
  ranNum(min, max) {
    return Math.ceil(Math.random()*(max - min)) + min
  }
  // 初始化显示区
  initShowView() {
    const container = document.createElement('div')
    container.className = 'show-view'
    const views = ['len', 'score']
    for (let i = 0; i < views.length; i++) {
      const node = document.createElement('div')
      node.textContent = views[i] + ': 0'
      node.id = views[i]
      node.className = views[i]
      container.appendChild(node)
    }
    document.querySelector('body').appendChild(container)
  }
  // 初始化控制区
  initController() {
    const container = document.createElement('div')
    container.className = 'controller-view'
    const dirs = ['left', 'down', 'right', 'up', 'fast']
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
      this.gameDown()
    }, false)
    document.getElementById('right').addEventListener('click', () => {
      if (this.current.right(this.gameData)) {
        this.gameMove()
      }
    }, false)
    document.getElementById('up').addEventListener('click', () => {
      if (this.current.up(this.gameData)) {
        this.gameMove()
      }
    }, false)
    document.getElementById('fast').addEventListener('click', () => {
      this.fastDown()
    }, false)
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 37 && this.current.left(this.gameData)) this.gameMove()
      if (event.keyCode === 38 && this.current.up(this.gameData)) this.gameMove()
      if (event.keyCode === 39 && this.current.right(this.gameData)) this.gameMove()
      if (event.keyCode === 40) this.gameDown()
      if (event.keyCode === 32) this.fastDown()
    }, false)
  }
  // 移动
  gameMove() {
    const data = this.current.data()
    const origin = this.current.origin
    const gameData = JSON.parse(JSON.stringify(this.gameData))
    const row = gameData.length
    const col = gameData[0].length
    for (let i = 0; i < data.length; i++) {
      if (i + origin.x >= row) {
        continue
      }
      for (let j =0; j < data[0].length; j++) {
        if (j + origin.y >= col) {
          continue
        }
        if (data[i][j] === 2) {
          gameData[i + origin.x][j + origin.y] = data[i][j]
        }
      }
    }
    this.refreshDivs(this.gameDivs, gameData)
  }
  // 下落
  gameDown(cb) {
    if (this.current.down(this.gameData)) {
      this.gameMove()
    } else {
      this.bindGameData()
      cb && cb()
      this.clearRow()
      this.current = null
      this.createNewTetries()
      this.gameMove()
    }
  }
  // 自动下落
  autoDown(time = 500) {
    if (this.autoTimer) {
      return false
    }
    this.autoTimer = setInterval(() => {
      this.gameDown(() => {
        clearInterval(this.autoTimer)
        this.autoTimer = null
      })
    }, time)
  }
  // 快速下落
  fastDown(time = 50) {
    if (this.fastTimer) {
      return false
    }
    this.fastTimer = setInterval(() => {
      this.gameDown(() => {
        clearInterval(this.fastTimer)
        this.fastTimer = null
      })
    }, time)
  }
  // 到达底部绑定
  bindGameData() {
    const data = this.current.data()
    const origin = this.current.origin
    const row = this.gameData.length
    const col = this.gameData[0].length
    for (let i = 0; i < data.length; i++) {
      if (i + origin.x >= row) {
        continue
      }
      for (let j =0; j < data[0].length; j++) {
        if (j + origin.y >= col) {
          continue
        }
        if (data[i][j] === 2) {
          this.gameData[i + origin.x][j + origin.y] = 1
        }
      }
    }
    this.refreshDivs(this.gameDivs, this.gameData)
  }
  // 清除行
  clearRow() {
    const gameData = this.gameData
    const newData = []
    const row = gameData.length
    const col = gameData[0].length
    const rowData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const rows = []
    for (let i = row - 1; i >= 0; i--) {
      let count = 0
      for (let j = 0; j < col; j++) {
        if (gameData[i][j] === 1) {
          count++
        }
      }
      if (count === col) {
        rows.push(i)
      } else {
        //newData.unshift(gameData[i])
      }
    }
    if (rows.length) {
      for (let i = 0; i < rows.length; i--) {
        //newData.unshift(rowData)
      }
      console.log(newData)
      //this.gameData = newData
      //this.updateShowView(rows.length)
    }
  }
  // 刷新行数和分数
  updateShowView(row) {
    this.$len = this.$len || document.getElementById('len')
    this.$len.textContent = `len: ${row}`
    const score = row * 10
    this.$score = this.$score || document.getElementById('score')
    this.$score.textContent = `score: ${score}`
  }
  // 生成新的俄罗斯
  createNewTetries() {
    this.current = this.next
    this.next = this.createTetries()
    this.refreshDivs(this.nextDivs, this.next.data())
    this.autoDown()
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
        if (divs[i][j].className !== this.className[data[i][j]]) {
          divs[i][j].className = this.className[data[i][j]]
        }
      }
    }
  }
}

const game = new Game()