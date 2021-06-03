This is a very simple, very slow and very dumb bruteforce password cracker for Terra Station wallets. It can help if you have a small list of possible passwords for a Terra Station wallet. It will not help if you don't know anything about the passwords as Terra Station passwords are at least 10 characters long. I've used it to recover a wallet where I had a list of a few hundred passwords and I knew that one of them was the correct one.

Bruteforcing somebody else's wallet without their knowledge is:

1. Most likely illegal depending on your juristiction
2. Virtually impossible due to the minimum length of 10 characters

# Installation

Clone the repo and run: `npm install`

# Usage

This script reads potential passwords from a file (one password per line) and attempts to decrypt the wallet.

In order to get the encrypted wallet string, follow these steps:

1. Open `Terra Station`
2. Open the `Developer Tools`
3. Navigate to `Application` -> `Local Storage` -> `chrome-extension://...` -> `keys`
4. At the bottom you'll find a window with all configured wallets. Select the correct one and copy the value of `wallet`

Call it like this: `node decrypt.js <password file> <wallet>`

To avoid having the shell interpret any characters in the wallet it is recommended to wrap `<wallet` in single quotes.

Example:

```
node decrypt.js ./testdata/passwords.txt '4075eda7d21471ed3d90c486b9d71bd09f2ce8fd881febd5bb5bd8c9c5272f3eJ+SICwukov6g50TSpQC8VtxUbp4H1GpXgXa7FsI8x0Ca4Qe3zziOCax+RvDWpboeKhQyY/ZXzWIHk7GsQFTlVTKdAs239Z0mK6sD+RZSOqLOJ3P4Fg3NNP0qIgq+NGbREsU9qsQ38tB0rHgwlNy0xsjojeUyh3rymOR9MJvS1H6j12AlA542pW/iS/bEvEinVkHY1xjwG7G0/q9UNXDnjH2ppnmQe9Suq9bKqVRfoBU1sLaDhEI2zayXxgt+qNC2qrvaX6NRZZcK7l+A3uoek00eI3z1Mo5NW7wC8HZTWXo4nPubjNIqEiXMcBAFfvoV'
```

