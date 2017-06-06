const util = require('./util.js')

const input = `
color #123abc
background-color #12 #34 #56 0.5
border-color #7f 50% 50%
filter greyscale 20% hue-rotate 90deg
margin 8px 4px
display 'block'
`

const tokenize = flow => {
  flow = flow.split('\n').filter(i => i)

  const patterns = util.patterns

  return flow.map(line =>
    line.match(patterns.whitespace).map(token => {
      let obj = {
        type: [],
        _value: token,
        value: null
      }
      switch(true) {
        case patterns.symbol.test(token):
          obj.type.push('symbol')
          obj.value = token
          break;
        case patterns.hex.test(token):
          obj.type.push('hex')
          obj.value = util.convert_from_hex_to_num(token)
          break;
        case patterns.bin.test(token):
          obj.type.push('bin')
          obj.value = util.convert_from_bin_to_num(token)
          break;
        case patterns.number.test(token):
          obj.type.push('number')
          obj.value = parseFloat(token)
          break;
        case patterns.unit.test(token):
          let unit_info = token.match(util.patterns.unit_extract).slice(1,3)
          obj.type.push('unit')
          obj.value = unit_info[0]
          obj.unit = unit_info[1]
          break;
        case patterns.string.test(token):
          obj.type.push('string')
          obj.value = util.format_string(token)
          break;
        default:
          console.error('something went wrong', token)
          break;
      }
      return obj
    }))
}

const parse = tokens => {
  let obj = {}

  tokens.forEach((line, j) => {
    let key1
    let key2
    let fn_counter = 0
    line.forEach((token, k) => {
      if(k === 0) {
        key1 = j + '_' + token.value
        obj[key1] = []
      } else {
        if ( token.type[0] === 'number'
        || token.type[0] === 'hex'
        || token.type[0] === 'bin'
        || token.type[0] === 'unit'
        || token.type[0] === 'string') {
          if(key2) obj[key1][key2].push(token)
          else obj[key1].push(token)
        } else if(token.type[0] === 'symbol') {
          key2 = fn_counter++ + '_' + token.value
          obj[key1][key2] = []
        }
      }
    })
  })
  return obj
}

const generate = ast => {
  return Object.keys(ast).map(line_key => {
    let real_key = util.format_symbol_start(line_key)
    let args = util.format_arguments(real_key, ast[line_key])
    if(args !== null)
      return `${real_key}: ${args.map((x, i, arr) =>
        x + (arr.length >= i ? '' : ' '))};`
    return `${real_key}: ${Object.keys(ast[line_key]).map(i =>
      isNaN(i)
        ? util.format_function(util.format_symbol_start(i), ast[line_key][i])
        : ast[line_key][i].type[0] === 'string'
          ? ast[line_key][i].value
          : ast[line_key][i]._value
    ).join(' ')};`
  }).join('\n')
}

const flow = (...args) => generate(parse(tokenize(...args)))

console.log(flow(input))
