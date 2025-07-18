const jwt = require("jsonwebtoken")
require("dotenv").config({path: require("path").resolve(__dirname, '../.env')})

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // user.id is available here
    next();
  });
}

module.exports = authenticateJWT