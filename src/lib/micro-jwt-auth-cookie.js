"use strict";

const url = require("url");
const jwt = require("jsonwebtoken");

module.exports = exports = (secret, whitelist, config = {}) => fn => {
  if (!secret) {
    throw Error(
      "micro-jwt-auth must be initialized passing a secret to decode incoming JWT token"
    );
  }

  if (!Array.isArray(whitelist)) {
    config = whitelist || {};
  }

  return (req, res) => {
    const bearerToken = req.cookies._token;
    const pathname = url.parse(req.url).pathname;
    const whitelisted =
      Array.isArray(whitelist) && whitelist.indexOf(pathname) >= 0;

    if (!bearerToken && !whitelisted) {
      res.writeHead(401);
      res.end(config.resAuthMissing || "missing token");
      return;
    }

    try {
      req.jwt = jwt.verify(bearerToken, secret);
    } catch (err) {
      if (!whitelisted) {
        res.writeHead(401);
        res.end(config.resAuthInvalid || "invalid token");
        return;
      }
    }

    return fn(req, res);
  };
};
