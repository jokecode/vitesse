export const isValidUsername = (str: string) => ['admin', 'editor'].includes(str.trim())

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export function isArray(arg: any) {
  if (typeof Array.isArray === 'undefined')
    return Object.prototype.toString.call(arg) === '[object Array]'

  return Array.isArray(arg)
}

export function isValidURL(url: string) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}
