const Urls = require('../db/entries');
const formatRawText = require('../assets/formatRawText');
const backButton = require('../assets/backbutton');
const Counters = require('../db/counters');

function increaseCount(req, res, callback) {
    Counters
        .findOneAndUpdate({}, { $inc: { 'count': 1 } }, function (error, data) {
            if (data) { callback(data.count) } else {
                const newCounter = new Counters();
                newCounter.save(function () {
                    Counters.findOneAndUpdate({}, { $inc: { 'count': 1 } }, function () {
                        callback(data.count);
                    })
                })
            }
        })
};

function postController(req, res) {
    console.log("entered the post controller")
    const url = req.body.url;
    const date = new Date();
    const urlObj = { url, date };
    const validateRegex = /https?:\/\/www\.\w+.com/ //http://www.example.com
    console.log("match comprobation", !url.match(validateRegex));
    if (!url.match(validateRegex)) {
      console.log("entered if match");
      res.send("error, invalid input");
    } else {
      Urls.findOne({ url }, function(error, urlFound) {
        if (error) res.send("There was an error :(");
        if (urlFound) {
          res.send(
            `The requested url ${formatRawText(
              urlFound,
              "red"
            )} is already in use in the database ${backButton}`
          );
        } else {
          increaseCount(req, res, function(count) {
            const newReqObj = { ...urlObj, short_url: count };
            const newEntry = new Urls(newReqObj).save(function(error) {
              if (error) {
                return res.send(
                  `Couldn't add the url [${formatRawText(
                    newReqObj,
                    "red"
                  )}] ${backButton}`
                );
              }
              res.send(
                `Successfully added the url ${formatRawText(newReqObj, "blue")}`
              );
            });
          });
        }
      });
    }}
    ;

module.exports = postController;