function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

function genKey() {
  let tokens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    chars = 5,
    segments = 5,
    keyString = '';

  for (let i = 0; i < segments; i++) {
    let segment = '';

    for (let j = 0; j < chars; j++) {
      let k = getRandomInt(0, 35);
      segment += tokens[k];
    }

    keyString += segment;

    if (i < segments - 1) {
      keyString += '-';
    }
  }

  return keyString;
}

export default n => {
  const keyStorage = [];

  if (keyStorage.length > 0) {
    keyStorage = [];
  }

  for (let i = 0; i < n; i++) {
    const key = genKey();
    keyStorage.push({ key });
  }

  return keyStorage;
};
