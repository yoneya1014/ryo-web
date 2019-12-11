require('dotenv').config();
const mongoose = require('mongoose');
const db_url = process.env.DB_STRING;
const db = mongoose.createConnection(db_url, (err, res) => {
    if (err) {
        console.log('Connection Failed:' + err);
    } else {
        console.log('Connection Succeed');
    }
});

let date = new Date();

const topicsSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    image_url: String,
    date: {type: Date, default: date.setTime(date.getTime() + 1000 * 60 * 60 * 9)}
});

exports.topics = db.model('topic', topicsSchema);