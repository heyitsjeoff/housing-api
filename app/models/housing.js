var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HousingSchema = new Schema({
    address: String,
    availableDate: String,
    approvals: [
        {
            name: String,
            approval: String
        }
    ],
    bathroomCount: Number,
    bedroomCount: Number,
    company: String,
    contacted: String,
    contactInfo: String,
    contactName: String,
    deposit: Number,
    description: String,
    garage: String,
    laundry: String,
    leaseReq: Number,
    parking: String,
    pets: String,
    picUrl: String,
    rent: Number,
    size: Number,
    status: String,
    title: String,
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('House', HousingSchema);
