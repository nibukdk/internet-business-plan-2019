const keys = require("../config/keys"),
  jwt = require("jsonwebtoken");
module.exports = verifyToken = (req, res, next) => {
  const token = req.cookies["authorization"];

  // decode token sent during jwt.sign
  if (token) {
    jwt.verify(token, keys.secretOrKey, (err, token_data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user_data = token_data;
        next();
      }
    });
  } else {
    return res.status(403).send("No token");
  }
};
