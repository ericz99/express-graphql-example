export default n => {
  let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';

  for (let i = 0; i < n; i++) {
    text += string.charAt(Math.floor(Math.random() * string.length));
  }

  return text;
};
