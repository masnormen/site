// biome-ignore lint/suspicious/noExplicitAny: need to
export function cn(...args: any[]) {
  var i = 0,
    tmp,
    str = '',
    len = args.length;
  for (; i < len; i++) {
    // biome-ignore lint/suspicious/noAssignInExpressions: need to
    if ((tmp = args[i])) {
      if (typeof tmp === 'string') {
        str += (str && ' ') + tmp;
      }
    }
  }
  return str;
}
