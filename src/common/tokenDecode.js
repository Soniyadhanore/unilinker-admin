import jwt_decode from "jwt-decode";

export const decodedToken = (token) => {
  if (!token) {
    return null;
  } else {
    return jwt_decode(token);
  }
};