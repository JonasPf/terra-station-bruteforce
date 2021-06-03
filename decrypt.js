const CryptoJS = require('crypto-js');
const fs = require('fs');
const readline = require('readline');

const keySize = 256;
const iterations = 100;

/** Tries to decrypt a wallet given a password. This code is mostly copy&pasted from the Terra Station code */
function decrypt(transitmessage, pass) {
  try {
    const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
    const encrypted = transitmessage.substring(64);

    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    return '';
  }
}

/** Tries to decrypt a wallet give a file with passwords (one per line) */
function bruteforce(passwordFile, wallet) {
  const fileStream = fs.createReadStream(passwordFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let i = 0;
  rl.on('line', (password) => {
    i = i + 1;
    if (i % 10000 == 0) {
      console.log(i + ' passwords tested');
    }
    if (password.length >= 10) {
      decrypted = decrypt(wallet, password);
      if (decrypted.startsWith('{"privateKey"')) {
        console.log('Found the password');
        console.log(password);
        console.log(decrypted);
      }
    }
  });
}

if (process.argv.length < 4) {
  console.log(`USAGE: ${process.argv[0]} ${process.argv[1]} <password file> <wallet>`);
  process.exit(1);
}

const passwordFile = process.argv[2];
const wallet = process.argv[3];
bruteforce(passwordFile, wallet);

