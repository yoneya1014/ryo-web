require('dotenv').config();
const mongoose = require('mongoose');

let date = new Date();

const topicsSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    image_url: String,
    date: {type: Date, default: date.setTime(date.getTime() + 1000 * 60 * 60 * 9)}
});

exports.topics = mongoose.model('topic', topicsSchema);