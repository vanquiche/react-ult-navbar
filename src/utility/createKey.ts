function createKey() {
  const min = 97;
  const max = 122;
  const length = 9;
  let key = '';
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      key += Math.round(Math.random() * 10);
    } else {
      key += String.fromCharCode(Math.round(Math.random() * (max - min) + min));
    }
  }
  return key;
}

export default createKey;
