const TIMEOUT = 5000;

function encrypt(data) {
  return "encrypted data";
}

function send(url, data) {
  const encryptedData = encrypt(data);
}

module.exports = {
  send,
  TIMEOUT,
};
