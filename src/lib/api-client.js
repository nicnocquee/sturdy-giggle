import "isomorphic-unfetch";

const apiClient = ({ url = "", method = "GET", body = null }) => {
  var options = {
    method,
    credentials: "include"
  };
  var urlToUse = url;
  if (url.indexOf("http") !== 0) {
    urlToUse = `${require("../environment").default.baseUrl}${url}`;
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
