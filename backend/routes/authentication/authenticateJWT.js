const jwt = require("jsonwebtoken")
require("dotenv").config({path: require("path").resolve(__dirname, '../.env')})

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  console.log(token)
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    // user.id is available here
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT