import "isomorphic-unfetch";

const apiClient = ({ url = "", method = "GET", body = null }, req) => {
  var options = {
    method,
    credentials: "include"
  };
  var urlToUse = url;
  if (url.indexOf("http") !== 0) {
    var baseUrl = require("../environment").default.baseUrl || "";
    if (!baseUrl) {
      if (req) {
        baseUrl = req.headers["host"];
      }
    }
    urlToUse = `${baseUrl}${url}`;
  }
  if (body) {
    options.headers = {
      "Content-Type": "application/json"
    };
    options.body = JSON.stringify(body);
  }
  return fetch(urlToUse, options);
};

export default apiClient;
