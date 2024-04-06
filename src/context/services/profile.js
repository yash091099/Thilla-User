// services/login.js
import instance from "./httpInterceptor";
const baseUrl = 'https://thilaa.jethitech.com/api/';

export const updateProfile = (data) => {
  const url = `${baseUrl}update-address`;
  return instance.post(url,data);
};


export const getProfile = () => {
  const url = `${baseUrl}profile`;
  return instance.get(url);
};



