function test(mobile) {
  const reg = /^\w+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+$/
  return reg.test(mobile)
}

function isEmal(email) {
  const reg = /^\w+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+$/
  return reg.test(email)
}

function isMobile(mobile) {
  const reg = /^1[0-9]{10}$/
  return reg.test(mobile)
}

function getQuerys(url = window.location.href) {
  const reg = /([^?&#]\w+)=([^?&#]*)/ig
  const querys = {}
  let matchs
  while( (matchs = reg.exec(url)) !== null) {
    querys[matchs[1]] = matchs[2]
  }
  return querys
}

export {
  test,
  getQuerys
}