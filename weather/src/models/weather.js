const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    place: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

//make JSON.stringify return only search text
weatherSchema.methods.toJSON = function () {
    return {
        place: this.place,
        description: this.description,
        createdAt: this.createdAt
    };
}

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;