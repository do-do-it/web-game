const parseHtml = (line) => {
  // 单引号转义，换行符替换为空格，去掉后面的空格
  line = line.replace(/('|")/g, '\\$1').replace(/\n/g, ' ').replace(/(^\s+)|(\s+$)/g,"")
  return 'r.push("' + line + '");\n'
}

const parseJs = (line) => {
  // 如果是js语法，则直接添加
  const reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g
  line = line.replace(/(^\s+)|(\s+$)/g,"")
  return line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n'
}

const Tpl = (tpl, data) => {
  const re = /{{(.+?)}}/g
  let cursor = 0
  let code = 'var r=[];\n'
  let match = null
  while ((match = re.exec(tpl)) !== null) {
    code += parseHtml(tpl.slice(cursor, match.index))
    code += parseJs(match[1])
    cursor = match.index + match[0].length
  }
  code += parseHtml(tpl.substr(cursor, tpl.length - cursor))
  code += 'return r.join("");'
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(data)
}

export default Tpl