const convert_from_bin_to_num = bin =>
  bin[1] === '!'
    ? parseInt(bin.replace('$!', ''), 2) * -1 + Math.pow(2, bin.length - 2) - 1
    : parseInt(bin.replace('$', ''), 2)

const convert_from_hex_to_num = hex =>
  hex[1] === '!'
    ? parseInt(hex.replace('#!', ''), 16) * -1 + Math.pow(16, hex.length - 2) - 1
    : parseInt(hex.replace('#',  ''), 16)

const format_string = str =>
  str.substring(1, str.length - 1)

const format_arguments = (key, args) => {
  const color_keys = ['color', 'background-color', 'background', 'border-color']
  if(color_keys.indexOf(key) > -1) {
    if(args.length === 1) {

      if(['number', 'hex', 'bin'].indexOf(args[0].type[0]) > -1) {
          return ['#' + args[0].value.toString(16)]
        }
    } else if(args.length === 3) {
      if(  (['number', 'hex', 'bin'].indexOf(args[0].type[0]) > -1)
         &&(['number', 'hex', 'bin'].indexOf(args[1].type[0]) > -1)
         &&(['number', 'hex', 'bin'].indexOf(args[2].type[0]) > -1)) {
          return [`rgb(${args[0].value}, ${args[1].value}, ${args[2].value})`]
        } else if(['number', 'hex', 'bin', 'unit'].indexOf(args[0].type[0]) > -1
               && args[1].type[0] === 'unit'
               && args[2].type[0] === 'unit') {
        let values = []

        if(args[0].type[0] === 'hex') values[0] = args[0].value
        if(args[0].type[0] === 'bin') values[0] = args[0].value
        if(args[0].type[0] === 'number') values[0] = args[0].value
        if(args[0].type[0] === 'unit' && ['deg', 'grad', 'turn'].indexOf(args[0].unit)) values[0] = args[0]._value

        if(args[1].type[0] === 'unit' && args[1].unit === '%') values[1] = args[1]._value

        if(args[2].type[0] === 'unit' && args[1].unit === '%') values[2] = args[2]._value

        return [`hsl(${values.join(', ')})`]
      }
    } else if(args.length === 4) {
      if(  (['number', 'hex', 'bin'].indexOf(args[0].type[0]) > -1)
         &&(['number', 'hex', 'bin'].indexOf(args[1].type[0]) > -1)
         &&(['number', 'hex', 'bin'].indexOf(args[2].type[0]) > -1)
         &&(['number', 'hex', 'bin'].indexOf(args[3].type[0]) > -1)) {
          return [`rgba(${args[0].value}, ${args[1].value}, ${args[2].value}, ${args[3].value})`]
        } else if(['number', 'hex', 'bin', 'unit'].indexOf(args[0].type[0]) > -1
               && args[1].type[0] === 'unit'
               && args[2].type[0] === 'unit'
               && ['number', 'unit'].indexOf(args[3].type[0])) {
          let values = []

          if(args[0].type[0] === 'hex') values[0] = args[0].value
          if(args[0].type[0] === 'bin') values[0] = args[0].value
          if(args[0].type[0] === 'number') values[0] = args[0].value
          if(args[0].type[0] === 'unit' && ['deg', 'grad', 'turn'].indexOf(args[0].unit))
              values[0] = args[0]._value

          if(args[1].type[0] === 'unit' && args[1].unit === '%')
              values[1] = args[1]._value

          if(args[2].type[0] === 'unit' && args[1].unit === '%')
              values[2] = args[2]._value

          if(args[0].type[0] === 'hex') values[0] = args[0].value
          if(args[0].type[0] === 'bin') values[0] = args[0].value
          if(args[0].type[0] === 'number') values[0] = args[0].value
          if(args[0].type[0] === 'unit'
            && args[0].unit === '%' )
              values[3] === args[3]._value

          return [`hsla(${values.join(', ')})`]
        }
    }
  }
  return null
}

const format_function = (fn_name, args) => {
  return `${fn_name}(${args.map(x => x.type[0] === 'string' ? x.value : x._value).join(', ')})`
}

const format_symbol_start = key => key.substring(key.indexOf('_') + 1, key.length)

const patterns = {
  whitespace:   /[^\s"']+|"([^"]*)"|'([^']*)'/g,
  symbol:       /^[a-z|\-|_]+$/i,
  hex:          /^#[!|\-]?[\a-f|\d]+$/i,
  bin:          /^\$[!|\-]?[0|1]+$/,
  number:       /^\-?\d+\.?\d*$/,
  string:       /^['"](.*)['"]$/,
  unit:         /^\d+\.?\d*(?:%|cm|em|ex|in|mm|Q|pc|pt|px|vh|vw|vmin|s|ms|deg|grad|rad|turn|hz|khz|dpi|dpcm|dppx)?$/i,
  unit_extract: /^(\d+\.?\d*)(%|cm|em|ex|in|mm|Q|pc|pt|px|vh|vw|vmin|s|ms|deg|grad|rad|turn|hz|khz|dpi|dpcm|dppx)?$/
}

module.exports = {
  convert_from_bin_to_num,
  convert_from_hex_to_num,
  format_string,
  format_arguments,
  format_function,
  format_symbol_start,
  patterns,
}
