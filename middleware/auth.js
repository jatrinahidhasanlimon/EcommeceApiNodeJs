const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
const bearerHeader = req.headers['authorization']
if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ')
    const token = bearer [1]
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
}else{
    return res.status(403).send("A token is required for authentication");
}
  
};

module.exports = verifyToken;