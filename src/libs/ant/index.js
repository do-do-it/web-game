/**
 * 
 * @param {总时间进度 t / d} p
 * @param {当前动画执行时间} t 
 * @param {初始值} b 
 * @param {变化量} c 
 * @param {动画持续总时长} d 
 */
const def = (p, t, b, c, d) => {
  return p
}

const Ant = (start, end, duration, cb, easing = def) => {
  const pass = {}
  const startTime = performance.now()
  const differ = end.x - start.x
  const loop = () => {
    timer = requestAnimationFrame(loop)
    const nowTime = performance.now()
    const pastTime = nowTime - startTime
    let per = pastTime / duration
    if (per >= 1) {
      per = 1
      cancelAnimationFrame(timer)
    }
    pass.x = differ * easing(per, nowTime, 0, differ, duration)
    cb && cb(pass)
  }
  let timer = requestAnimationFrame(loop)
}

export default Ant
