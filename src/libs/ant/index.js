/**
 * 
 * @param {总时间进度 t / d} x
 * @param {当前动画执行时间} t 
 * @param {初始值} b 
 * @param {变化量} c 
 * @param {动画持续总时长} d 
 */
const def = (x, t, b, c, d) => {
  return x
}

const Ant = (start, end, duration, cb, easing = def) => {
  const startTime = performance.now()
  const differ = end - start
  const loop = () => {
    timer = requestAnimationFrame(loop)
    const nowTime = performance.now()
    const pastTime = nowTime - startTime
    let per = pastTime / duration
    if (per >= 1) {
      per = 1
      cancelAnimationFrame(timer)
    }
    const pass = differ * easing(per, nowTime, 0, differ, duration)
    cb && cb(pass)
  }
  let timer = requestAnimationFrame(loop)
}

export default Ant
