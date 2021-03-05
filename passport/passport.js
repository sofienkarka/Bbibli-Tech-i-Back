const passport =require('passport')
const User = require('../Schemas/userSchema')
const jwt = require("jsonwebtoken")
const BearerStrategie = require("passport-http-bearer").Strategy
passport.use(new BearerStrategie( async(token, done)=> {
    const decodedData = await jwt.verify(token,'secret');
    console.log(decodedData);
      User.findOne({ _id: decodedData.userId }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));