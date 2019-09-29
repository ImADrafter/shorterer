const Urls = require('../db/entries');
const formatRawText = require('../assets/formatRawText');
var express = require('express');
var router = express.Router();

function getSortedController(req, res) {
    const id = req.params.id;
    Urls.findOne({ short_url: id }, function (error, urlFound) {
        if (error) { return res.send(error) };
        if (urlFound && urlFound.url) {
            const urlRedirected = urlFound.url;
            res.redirect(urlRedirected);
        } else {
            res.send('Couldnt find that id :/')
        }
    })

}

module.exports = getSortedController;