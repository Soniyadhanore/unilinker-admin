import axios from "axios";
import addDeleteGetLocalStorage from "./addDeleteGetLocalStorage";
import { STORAGE } from "../common/LocalVariable";
import { API_KEY, BASE_URL } from "../BaseUrl";

/**
 * @description This function is used to logout the user
 */
export const sessionLogout = async () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};

/**
 * @description This function is used to start the session time
 */
const startSessionTime = () => {
  let time = new Date().getTime().toString();
  addDeleteGetLocalStorage(STORAGE.SESSION_TIME, time, "add", "single");
};

/**
 * @description This function is used to get the third party request
 */
export const getThirdPartyRequest = async (url) => {
  startSessionTime();
  if (url !== undefined) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

const globalRequest = (
  url,
  method = "get",
  data = {},
  options = {},
  token = false
) => {
  //gloabl axios request for post get put and delete

  // console.log("data-2", url);
  let headers = {
    "x-api-key": API_KEY,
  };
  if (token) {
    const data = addDeleteGetLocalStorage(STORAGE.USER_TOKEN, {}, "get");
    // let json = {};
    // try {
    //   json = JSON.parse(data);
    //   console.log(json);
    // } catch (e) {
    //   json = {};
    // }
    headers.authorization = data; //"Bearer " +
  }
  let sendData = {
    method: method,
    url: BASE_URL + url,
    headers: headers,
    ...options,
  };
  
  // console.log("data-2", sendData);
  if (data) {
    sendData.data = data;
  }

  startSessionTime(); //start session time
  return new Promise((resolve, reject) => {
    axios(sendData)
      .then((response) => {
        if (response?.data?.status === 401) {
          sessionLogout();
        }
        resolve(response.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          sessionLogout();
        }
        reject(err);
      });
  });
};

export default globalRequest;
