const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Urls = new Schema({
    url: { type: String }, shortedUrl: { type: String }, date: { type: Date }
});

module.exports = mongoose.model('Urls', Urls);