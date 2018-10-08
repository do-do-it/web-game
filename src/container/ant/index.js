import Ant from 'src/libs/ant'
import './index.less'

const easeIn = (x) => {
  return x ** 2
}

const shake = (x, t, b, c, d) => {
  if (x < 0.6) {
    return (x / 0.6) ** 2
  } else {
    return Math.sin((x - 0.6) * ((3 * Math.PI) / 0.4)) * 0.2 + 1
  }
}

Ant(0, 100, 1000, value => {
  document.getElementById('app').style.left = value + 'px'
}, shake)
