const jwt = require("jsonwebtoken");

const autheticateToken = (req,res,next) => {
try {
    
const authHeader = req.headers['authorization'];

const token = authHeader && authHeader.split(' ')[1];

if(!token){
          return   res.status(400).json({error:"user not found"})
}

const decoded = jwt.verify(token,process.env.)

} catch (error) {
      return   res.status(500).json({error:"Server error"})
}
}