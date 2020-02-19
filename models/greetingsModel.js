require('dotenv').config();
const mongoose = require('mongoose');

const greetingsSchema = new mongoose.Schema({
    person_type: String,
    greeting_text: String,
    image_ext: String
});

exports.greetings = mongoose.model('greeting', greetingsSchema);