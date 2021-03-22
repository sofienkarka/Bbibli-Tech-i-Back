const jwt=require('jsonwebtoken')


const authMiddleWare =  async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) return res.json("forbidden")
    const token = authHeader.split(' ')[1];
  
    try {
       await jwt.verify(token, 'secret');
        next();
    } catch (error) {
      const message = error.name === 'JsonWebTokenError' ? 'Unauthorizedd' : error.message;
      return res.json("token invalid");
    }
  };

  module.exports={authMiddleWare}