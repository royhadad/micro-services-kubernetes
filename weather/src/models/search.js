const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

//make JSON.stringify return only search text
searchSchema.methods.toJSON = function () {
    return this.text;
}

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;