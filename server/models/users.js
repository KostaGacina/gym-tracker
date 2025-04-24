const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    stats: {
        sex: {
            type: Boolean,
            required: false
        },
        age: {
            type: Number,
            required: false
        },
        height: {
            type: Number,
            required: false
        },
        weight: {
            type: Number,
            required: false
        },
        bodyFatPercentage: {
            type: Number,
            required: false
        }
    },
    activePlan: {
        type: String,
        enum: ['bulk', 'maintain', 'cut'],
        // default: 'maintain'
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'
    }],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);