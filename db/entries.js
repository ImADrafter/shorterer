const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Urls = new Schema({
    url: String, short_url: String, date: Date
});

module.exports = mongoose.model('Urls', Urls);