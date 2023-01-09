const crypto = require("crypto");

// console.log(
//   "base64 :: ",
//   crypto.createHash("sha512").update("비밀번호").digest("base64")
// );

// console.log(
//   "hex :: ",
//   crypto.createHash("sha512").update("비밀번호").digest("hex")
// );

// pdkdf2

// crypto.randomBytes(64, (err, buf) => {
//   const salt = buf.toString("base64");

//   console.log("salt", salt);

//   crypto.pbkdf2("비밀번호", salt, 100000, 64, "sha512", (err, key) => {
//     console.log("password generated :: ", key.toString("base64"));
//   });
// });

// 양방향 암호화 암호화 복호화
const algorithm = "aes-256-cbc";
const key = "abcdefghijklmnopqrstuvwxyz123456";
//암호화할 때 사용하는 초기화 벡터를 의미
const iv = "1234567890123456";
const cipher = crypto.createCipheriv(algorithm, key, iv);
//cipher.update(문자열, 인코딩, 출력 인코딩):
let result = cipher.update("암호화할 문장", "utf8", "base64");

console.log("cipher.update result:: ", result);
const cipherFinal = cipher.final("base64");

console.log("cipherFinal:: ", cipherFinal);
result += cipherFinal;

console.log("암호화 ==== :", result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, "base64", "utf8");

console.log("decipher.update result:: ", result2);

const decipherFinal = decipher.final("utf8");

console.log("decipherFinal:: ", decipherFinal);

result2 += decipherFinal;
console.log("복호화 ==== :", result2);

/**
 * 
 * 
• crypto.createCipheriv(알고리즘, 키, iv): 암호화 알고리즘과 키, iv를 넣습니다. 암호화 알고리즘은 aes-256-cbc를 사용했으며, 다른 알고리즘을 사용해도 됩니다. aes-256-cbc 알고리즘의 경우 키는 32바이트여야 하고, iv는 16바이트여야 합니다. iv는 암호화할 때 사용하는 초기화 벡터를 의미하지만, 이 책에서 설명하기에는 내용이 많으므로 AES 암호화에 대해 따로 공부하는 것이 좋습니다. 사용 가능한 알고리즘 목록은 crypto.getCiphers()를 호출하면 볼 수 있습니다.

• cipher.update(문자열, 인코딩, 출력 인코딩): 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣습니다. 보통 문자열은 utf8 인코딩을, 암호는 base64를 많이 사용합니다.

• cipher.final(출력 인코딩): 출력 결과물의 인코딩을 넣으면 암호화가 완료됩니다.

• crypto.createDecipheriv(알고리즘, 키, iv): 복호화할 때 사용합니다. 암호화할 때 사용했던 알고리즘과 키, iv를 그대로 넣어야 합니다.

• decipher.update(문자열, 인코딩, 출력 인코딩): 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣습니다. createCipheriv의 update()에서 utf8, base64순으로 넣었다면 createDecipheriv의 update()에서는 base64, utf8순으로 넣으면 됩니다.

• decipher.final(출력 인코딩): 복호화 결과물의 인코딩을 넣습니다.
 */
