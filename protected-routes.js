var express = require("express"),
  jwt = require("express-jwt"),
  config = require("./config"),
  quoter = require("./quoter");

var app = (module.exports = express.Router());

// Validate access_token
var jwtCheck = jwt({
  secret: config.secret,
  audience: config.audience,
  issuer: config.issuer,
});

// Check for scope
function requireScope(scope) {
  return function (req, res, next) {
    var has_scopes = req.user.scope === scope;
    if (!has_scopes) {
      res.sendStatus(401);
      return;
    }
    next();
  };
}

app.use("/api/protected", jwtCheck, requireScope("full_access"));

app.get("/api/protected/random-quote", function (req, res) {
  res.status(200).json(quoter.getRandomOne());
});

app.get("/api/protected/quotes", function (req, res) {
  const limit = +(req.query.limit ?? 10);
  const page = +(req.query.page ?? 1);

  if (!Number.isInteger(limit)) {
    res.status(400).json({
      error: `'limit' must be an integer.`,
    });
    return;
  }
  if (!Number.isInteger(page)) {
    res.status(400).json({
      error: `'page' must be an integer.`,
    });
    return;
  }

  res.status(200).json(quoter.getMany());
});
