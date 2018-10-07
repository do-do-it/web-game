import Tpl from 'src/libs/tpl'

const data = {
  name: 'zm',
  age: 18,
  sex: 'boy'
}

const tpl = document.getElementById('tpl').innerHTML.toString()
const str = Tpl(tpl, data)
document.getElementById('app').innerHTML = str