var express = require('express');
var router = express.Router();
const Entries = require('../db/entries')

const app = express();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

function handleUrlSend(url, date, callback) {
  console.log('im on it');
  console.dir(Entries);
  const urlObj = { url, date };
  Entries.findOne({ "url": url }, function (error, urlFound) {
    if (error) console.log(error);
    if (urlFound) {
      console.log('already in')
    } else {
      const newEntry = new Entries(urlObj);
      console.log('done');
    }
  });


}

router.post('/handler', function (req, res) {
  const urlString = req.body.url;
  const date = new Date();
  handleUrlSend(urlString, date);
  res.redirect('/');
})


module.exports = router;
