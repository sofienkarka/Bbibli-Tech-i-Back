const db=require('./DataBase/Connect')
const express = require('express');

const cors = require('cors')
const listbooksV=require('./Routes/listbooksV')

const app=express();
const logger = require('morgan');
const authAPI = require ('./Routes/authAPI')
const LivresAPI=require('./Routes/LivreAPI')
const OrdersAPI=require('./Routes/OrderAPI')
const CategoryAPI=require('./Routes/CategoryAPI')
app.use(logger('dev'));
app.use(express.json());

app.use('/uploads', express.static('uploads'));







app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


app.use('/auth', authAPI);

app.use('/category',CategoryAPI)
app.use('/Livres',LivresAPI);
app.use('/listbooksV',listbooksV);

app.use('/Orders',OrdersAPI)







 
app.use('/Livres',LivresAPI);
app.use('/Category',CategoryAPI);

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