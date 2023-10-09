export default function (name) {
  var regex = /^[\p{L} .'-]+$/u
  return regex.test(name)
}
