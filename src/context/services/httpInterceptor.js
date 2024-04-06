import axios from 'axios';

const instance = axios.create({
  baseURL:'https://thilaa.jethitech.com/api/', // Replace with your API base URL
});

instance.interceptors.request.use(
  (config) => {

    if (localStorage.getItem('token')) {
      config.headers['authorization'] = `Bearer ${localStorage.getItem('token')}`;

      console.log(config,'config')
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
 
    return Promise.reject(error);
  }
);

export default instance;
