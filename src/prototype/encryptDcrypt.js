/**
 * this file for encrypt and decrypt values
 */
// const CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js";

const encryptDcrypt = (type = "en", value = "") => {
  let secret = "2vkAnVjRet6ymgwd4ZnfXYWUMMfQcq7TthrILE9odGRS2CzS7";

  if (type === "en") {
    return CryptoJS.AES.encrypt(value, secret);
  } else {
    let c = CryptoJS.AES.decrypt(value, secret);
    return c.toString(CryptoJS.enc.Utf8);
  }
};
export default encryptDcrypt;
