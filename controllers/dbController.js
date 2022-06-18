'use strict';

const mongoose = require('mongoose');

// MongoDB keys

exports.dbConnect = () => {

    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('MongoDB connected!');
            })
            .catch(error => {
                console.log(error);
            });
    } catch (err) {
        console.log(err);
    }
};
