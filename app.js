var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(request, res, next) {
  next(createError(404));
});

// error handler
app.use(function(error, request, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = request.app.get("env") === "development" ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.render("error");
});

module.exports = app;
