var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HousingSchema = new Schema({
    title: String,
    address: String,
    description: String,
    url: {
        type: String,
        required: true
    },
    rent: Number,
    size: Number,
    picUrl: String,
    bedroomCount: Number,
    bathroomCount: Number,
    notes: String,
    approvals: [
        {
            name: String,
            approval: String
        }
    ],
    contacted: String
});

module.exports = mongoose.model('House', HousingSchema);
