import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const decrypt = (hash) => {
  var bytes = CryptoJS.AES.decrypt(hash, SECRET_KEY);
  var decrypted = bytes.toString(CryptoJS.enc.Utf8);

  return decrypted.toString();
};

export default decrypt;
