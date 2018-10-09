import Ant from 'src/libs/ant'
import './index.less'

const easeIn = (p, t, b, c, d) => {
  const a = 1
  const w = 2 * Math.PI / t
  const φ = 0
  const h = 10
  const x = p * c
  const y = a * Math.sin(w * x + φ) + h
  return y
}

const shake = (p, t, b, c, d) => {
  if (p < 0.6) {
    return (p / 0.6) ** 2
  } else {
    return Math.sin((p - 0.6) * ((3 * Math.PI) / 0.4)) * 0.2 + 1
  }
}

Ant({
  x: 0
}, {
  x: 100
}, 1000, props => {
  document.getElementById('app').style.top = props.x + 'px'
}, easeIn)
