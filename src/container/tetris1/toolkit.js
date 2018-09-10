export default {
  createTetrisArray(m, n, x) {
    let array = new Array(20)
    for (let index = 0; index < array.length; index++) {
      array[index] = this.createArray(n, x)
    }
    return array
  },
  createArray(n, x) {
    let array = new Array(n)
    for (let index = 0; index < array.length; index++) {
      array[index] = x
    }
    return array
  }
}