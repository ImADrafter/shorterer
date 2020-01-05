var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const mongo = require("mongodb");
const postController = require("../controllers/postController");
const getSortedController = require("../controllers/getSortedController");

require("custom-env").env();

mongoose.connect(process.env.MONGOLAB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Allow CORS
router.use(function(request, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* GET home page. */
router.get("/", function(request, res, next) {
  res.render("index");
});

router.post("/new", function(request, res) {
  postController(request, res);
});

router.get("/shorturl/:id", function(request, res) {
  getSortedController(request, res);
});

module.exports = router;
