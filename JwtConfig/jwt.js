const jwt=require('jsonwebtoken')


const authMiddleWare =  async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.json("forbidden")
    const token = authHeader.split(' ')[1];
  
    try {
      const verifToken = await jwt.verify(token, 'secret');
        next();
    } catch (error) {
      const message = error.name === 'JsonWebTokenError' ? 'Unauthorizedd' : error.message;
      return res.json("forbidden");
    }
  };

  module.exports={authMiddleWare}