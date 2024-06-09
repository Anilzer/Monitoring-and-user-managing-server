import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";


function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        reject(error);
      } else {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            reject(error);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}

const privateKey = fs.readFileSync("./private.key", 'utf8');

function generateJwt(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { algorithm: "RS256" }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

export { hashPassword, generateJwt};
