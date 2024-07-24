
/**
 * this file for add, get and delete local values 
 */

import encryptDcrypt from "./encryptDcrypt";

const addDeleteGetLocalStorage = (
  name,
  dataObj = {},
  type = "add",
  addType = "multiple"
) => {
  if (type == "add") {
    //add to the local
    if (addType == "single") {
      // encrypt and store to the local with key
      let en = encryptDcrypt(
        "en",
        typeof dataObj == "object" ? JSON.stringify(dataObj) : dataObj
      );
      localStorage.setItem(name, en);
    } else {
      //find same key in the local
      let getItem = localStorage.getItem(name);
      // if data present in the local then encrypt and push to the array
      if (getItem != undefined) {
        let de = encryptDcrypt("de", getItem);
        let parse = JSON.parse(de);
        let a = Array.from(parse);
        a.push(dataObj);
        let t = encryptDcrypt("en", JSON.stringify(a));
        localStorage.setItem(name, t);
      } else {
        // if not present in the local then create new encrypt array and store to the local
        let en = encryptDcrypt("en", JSON.stringify([dataObj]));
        localStorage.setItem(name, en);
      }
    }
  } else if (type == "get") {
    //get from the local

    try {
      let g = localStorage.getItem(name);
      let d = encryptDcrypt("de", g);
      return d;
    } catch (e) {
      return null;
    }
  } else if (type == "delete") {
    //delete from local
    localStorage.removeItem(name);
  } else {
    //find obj present in the multiple data if present
    //then removes from array and update local
    let getItem = localStorage.getItem(name);
    if (getItem != undefined) {
      let de = encryptDcrypt("de", getItem);
      let parse = JSON.parse(de);
      let a = Array.from(parse);
      let l = [];
      a.forEach((obj) => {
        if (dataObj.id != obj.id) {
          l.push(obj);
        }
      });
      // console.log("delete ", l);
      let t = encryptDcrypt("en", JSON.stringify(l));
      localStorage.setItem(name, t);
    } else {
      localStorage.removeItem(name);
    }
  }
};

export default addDeleteGetLocalStorage;
