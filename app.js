const db=require('./DataBase/Connect')
const express = require('express');
const cors = require('cors')
const app=express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authAPI = require ('./Routes/authAPI')
const LivresAPI=require('./Routes/LivreAPI')
const listbooksV=require('./Routes/listbooksV')



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authAPI);
app.use('/Livres',LivresAPI);
// app.use('/listbooksV',listbooksV);









// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
  });
  app.listen(3000)
  module.exports = app;