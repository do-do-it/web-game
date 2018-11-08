var str = 'name: zm, age: 18'
var reg = /(\w+): (\w+),?/g
// str = str.replace(reg, (...args) => {
//   console.log(args)
//   return args[1] + '-' + args[2]
// })
var matchs
while (matchs = reg.exec(str)) {
  console.log(matchs)
}
