import { getQuerys } from 'src/libs/reg'
const url = 'http://baidu.com?name=zm&age=18&url=' + encodeURIComponent('http://baidu.com?name=zm&age=18')

const querys = getQuerys()
console.log(querys)