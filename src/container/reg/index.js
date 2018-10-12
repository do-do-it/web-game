import { test } from 'src/libs/reg'

const querys = test('3038904544562@qq.cn.com')
console.log(querys)

const a = /([^?&]\w+)=([^?&]*)/g.exec(window.location.href)
console.log(document.getElementById('tpl').innerHTML.toString())