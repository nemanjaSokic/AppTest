import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var user = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});

export default mongoose.model('User', user);