// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function cn(...args: any[]) {
  var i = 0,
    tmp,
    str = '',
    len = args.length;
  for (; i < len; i++) {
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    if ((tmp = args[i])) {
      if (typeof tmp === 'string') {
        str += (str && ' ') + tmp;
      }
    }
  }
  return str;
}
