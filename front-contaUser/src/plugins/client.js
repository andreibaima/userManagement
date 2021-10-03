var axios = require("axios");

var axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  responseType: "json",
  responseEncoding: "utf8",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  },
});

// export default axiosInstance;
module.exports = axiosInstance;