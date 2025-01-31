var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 引入admin的路由
const UserRouter = require('./routes/admin/UserRouter');
const AdminHouseRouter = require('./routes/admin/HouseRouter');
const WebHouseRouter = require('./routes/web/HouseRouter');
const UserEditRouter = require('./routes/admin/UserEditRouter');
const JWT = require('./util/JWT');

var app = express();

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


// 注册admin的路由
app.use(UserRouter)
app.use(WebHouseRouter)

app.use((req, res, next) => {
  //如果token有效，next()
  //如果token过期了，返回401
  
  if(req.url === '/adminapi/user/login'){
    next()
    return;
  }
  const token = req.headers['authorization'].split(' ')[1]
 
  if(token){
    var payload = JWT.verify(token)
    
    if(payload){
      const newToken = JWT.generate({
        id: payload.id,
        username: payload.username,
      },'1h')
      res.header('authorization',newToken)
      next()
    }else{
      res.status(401).send({errCode:'-1',errorInfo:'token过期'})
    }
  }
})
// 用户信息修改路由
app.use(UserEditRouter)
app.use(AdminHouseRouter)

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
