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

const foodMenuSchema = new mongoose.Schema({
    filename: String,
    from: Date,
    to: Date
});

exports.foodMenu = db.model('foodmenu', foodMenuSchema);