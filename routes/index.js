var express = require('express');
var router = express.Router();
const Urls = require('../db/entries');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const backButton = require('../assets/backbutton.js')
const formatRawText = require('../assets/formatRawText')

require('custom-env').env()

mongoose.connect(process.env.MONGOLAB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);


const app = express();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/new', function (req, res) {
  const url = req.body.url;
  const date = new Date();
  const urlObj = { url, date };
  Urls.findOne({ "url": url }, function (error, urlFound) {
    if (error) res.send('badly done');
    if (urlFound) {
      res.send(`The requested url ${formatRawText(url, 'red')} is already in use in the database ${backButton}`)
    } else {
      const newEntry = new Urls({ 'url': url, 'date': date })
        .save(function (error) {
          if (error) { return res.send(`Couldn't add the url [${formatRawText(url, 'red')}] ${backButton}`) };
          res.send(`Successfully added the url ${formatRawText(url, 'blue')} at ${formatRawText(date, 'blue')} ${backButton}`)
        })
    }
  });
})


module.exports = router;
