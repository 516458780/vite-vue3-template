export default {
  isTrueMobileNumber (str) {
    return (/^1([34567])\d{9}$/.test(str))
  },

  px750rem (val) {
    return `${val / 75}rem`
  }
}
