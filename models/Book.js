var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    description: String,
    published_year: String,
    publisher: String,
    authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Book', BookSchema);