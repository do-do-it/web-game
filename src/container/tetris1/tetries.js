/*
 * @Author: Zhang Min 
 * @Date: 2018-09-11 08:15:40 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-09-11 09:32:02
 */


export default class Tetris {
  constructor(type, dir) {
    this.dir = dir
    this.data = this.createData(type)
    this.origin = {
      x: 0,
      y: 0
    }
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
      default:
        break
    }
    return data
  }
  canDown() {
     
  }
}