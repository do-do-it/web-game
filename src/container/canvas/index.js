import './index.less'
import s from './test.mp4'

const app = document.getElementById('app')

const video = document.createElement('video')
video.setAttribute('src', s)

const w = 50
const h = 90
const offCanvas = document.createElement('canvas')
offCanvas.width = w
offCanvas.height = h
const offCtx = offCanvas.getContext('2d')

const canvas = document.createElement('canvas')
canvas.width = w
canvas.height = h
canvas.style.backgroundColor = '#f2f2f2'
const ctx = canvas.getContext('2d')

app.appendChild(canvas)

let timer = null
video.addEventListener('play', () => {
  const draw = () => {
    offCtx.drawImage(video, 0, 0, offCanvas.width, offCanvas.height)
    const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height)
    consolePlay(imgData)
    // ctx.putImageData(style(imgData), 0, 0)
  }
  timer = setInterval(draw, 40)
  draw()
})
video.addEventListener('pause', () => {
  clearInterval(timer)
  const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height)
  consolePlay(imgData)
})

video.play()

function consolePlay(data) {
  const imgData = data.data
  const w = data.width
  const arr = []
  for (let i = 0; i < imgData.length; i += 4) {
    const val = .299 * imgData[i] + .587 * imgData[i + 1] + .114 * imgData[i + 2]
    const v = val > 100 ? 0 : 1
    arr.push(v)
  }
  // console.clear()
  let str = ''
  for (let i = 0; i < h; i++) {
    const a = []
    for (let j = 0; j < w; j++) {
      a.push(arr[i * w + j])
    }
    str += a.join('')
    str += ' \n '
  }
  console.log(str)
}

function style(c) {
  for (var i = 0; i < c.data.length; i += 4) {
    const val = .299 * c.data[i] + .587 * c.data[i + 1] + .114 * c.data[i + 2]
    c.data[i] = c.data[i + 1] = c.data[i + 2] = val > 125 ? 255 : 0
    c.data[i + 3] = 255
  }
  return c
}