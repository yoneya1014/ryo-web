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

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

exports.user = db.model('admin_info', userSchema);