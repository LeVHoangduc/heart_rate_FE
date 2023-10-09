export default function (password) {
  var regex = {
    capital: /(?=.*[A-Z])/, // at least one upper case
    length: /(?=.{7,40}$)/, // at least 7 characters
    specialChar: /[ -/:@[-`{-~]/, // at least one special character
    digit: /(?=.*[0-9])/ // at least one digit
  }
  return (
    regex.capital.test(password) &&
    regex.length.test(password) &&
    regex.specialChar.test(password) &&
    regex.digit.test(password)
  )
}
