import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var task = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

export default mongoose.model('Task', task);