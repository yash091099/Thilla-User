

 let baseUrl="https://thilaa.jethitech.com/api/";
import instance from "./httpInterceptor";

export const getNotifications = () => {
  const url = `${baseUrl}notifications`;
  return instance.get(url);
};

  export const markNotificationAsRead = (queryParams) => {
    const url = `${baseUrl}mark-read/${queryParams}`;
    return instance.get(url);
  };