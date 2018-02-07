var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = Schema({
    firstname: String,
    lastname: String,
    // Book: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});


module.exports = mongoose.model('Author', AuthorSchema);