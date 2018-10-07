import { max } from "moment";

/*
 * @Author: Zhang Min 
 * @Date: 2018-09-11 08:15:40 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-09-22 09:22:50
 */


export default class Tetris {
  constructor(type, dir) {
    this.dir = dir
    this._data = this.createData(type)
    this.origin = {
      x: 0,
      y: 0
    }
  }
  data() {
    return this._data[this.dir % 4]
  }
  createData(type = 1) {
    let data = []
    switch(type) {
      case 1:
        data = [
          [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ]
        ]
        break
      case 2:
        data = [
          [
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ]
        ]
        break
      case 3:
        data = [
          [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 2, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 2, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [2, 2, 2, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
          ]
        ]
        break
      case 4:
        data = [
          [
            [0, 0, 0, 0],
            [0, 2, 0, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [2, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
          ]
        ]
        break
      case 5:
        data = [
          [
            [0, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 2, 0],
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 2, 0],
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
          ]
        ]
        break
      case 6:
        data = [
          [
            [0, 0, 2, 0],
            [2, 2, 2, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 2, 0],
            [2, 2, 2, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
          ]
        ]
        break
      default:
        break
    }
    return data
  }
  left(gameData) {
    if (this.canLeft(gameData)) {
      this.origin.y--
      return true
    }
    return false
  }
  down(gameData) {
    if (this.canDown(gameData)) {
      this.origin.x++
      return true
    }
    return false
  }
  right(gameData) {
    if (this.canRight(gameData)) {
      this.origin.y++
      return true
    }
    return false
  }
  up(gameData) {
    if (this.canUp(gameData)) {
      this.dir++
      return true
    }
    return false
  }
  canUp(gameData) {
    const row = this.origin.x
    const col = this.origin.y
    const dir = this.dir + 1
    const data = this._data[dir % 4]
    const size = data.length
    const maxRow = gameData.length
    const maxCol = gameData[0].length
    let flag = true
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (data[j][i] === 2 && (gameData[row + j][col + i] === undefined || gameData[row + j][col + i] === 1)) {
          flag = false
          break
        }
      }
      if (!flag) {
        return false
      }
    }
    return true
  }
  canLeft(gameData) {
    const row = this.origin.x
    const col = this.origin.y - 1
    const data = this.data()
    const size = data.length
    if (col < size * -1) {
      return false
    }
    for (let i = 0; i < size; i++) {
      let canLeft = true
      for (let j = 0; j < size; j++) {
        if (data[j][i] === 2 && (gameData[row + j][col + i] === 1 || col + i < 0)) {
          canLeft = false
          break
        }
      }
      if (!canLeft) {
        return false
      }
    }
    return true
  }
  canRight(gameData) {
    const row = this.origin.x
    const col = this.origin.y + 1
    const data = this.data()
    const size = data.length
    const maxLen = gameData[0].length
    for (let i = size - 1; i >= 0; i--) {
      let canLeft = true
      for (let j = 0; j < size; j++) {
        if (data[j][i] === 2 && (gameData[row + j][col + i] && gameData[row + j][col + i] === 1 || col + i >= maxLen)) {
          canLeft = false
          break
        }
      }
      if (!canLeft) {
        return false
      }
    }
    return true
  }
  canDown(gameData) {
    const row = this.origin.x + 1
    const col = this.origin.y
    const data = this.data()
    const size = data.length
    const maxRow = gameData.length
    if (row > maxRow - size + 1) {
      return false
    }
    for (let i = size - 1; i >= 0; i--) {
      for (let j = 0; j < size; j++) {
        if (data[i][j] === 2 && gameData[row + i][col + j] === 1) {
          return false
        }
      }
    }
    return true
  }
}