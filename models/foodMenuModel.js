require('dotenv').config();
const mongoose = require('mongoose');

const foodMenuSchema = new mongoose.Schema({
    filename: String,
    from: Date,
    to: Date
});

exports.foodMenu = mongoose.model('foodmenu', foodMenuSchema);