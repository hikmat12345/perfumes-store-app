var createError = require('http-errors');
var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();


const mongoose= require("mongoose")
  mongoose.set("strictQuery", false);
  mongoose.connect("mongdb://localhost:27017/PerfumeStore", () => {
    console.log("Connected to MongoDB");
  });
const alcohlicPerfume = require("./src/models/schema")
/* GET users listing. */
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/alcohlic-perfume', (req, res, next)=>{
  const alcohlicPerfumeSc =new alcohlicPerfume({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imagePath: req.body.imagePath
  })
  alcohlicPerfumeSc.save().then((result)=>{
    console.log(result, 'result')
  }).catch((err)=>{
    console.log(err, 'error')
  })
});
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
  res.render('error');
});

module.exports = app;
