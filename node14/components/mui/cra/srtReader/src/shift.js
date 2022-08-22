
export default function doCaesarCipher(str, num) {
  let result = '';
  for (var i = 0; i < str.length; i++) {
    let charcode = (str[i].charCodeAt()) + num;
    result += String.fromCharCode(charcode);
  }

  return result;
}
