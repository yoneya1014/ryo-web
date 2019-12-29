require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

exports.user = mongoose.model('admin_info', userSchema);