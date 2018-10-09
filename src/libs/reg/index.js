function getQuerys(url) {
  const reg = /([^?&]\w+)=([^&]*)/ig
  const querys = {}
  let matchs
  while( (matchs = reg.exec(url)) !== null) {
    querys[matchs[1]] = matchs[2]
  }
  return querys
}

export {
  getQuerys
}