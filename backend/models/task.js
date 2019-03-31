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
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    assignee: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    created: {
        type: Date
    },
    updated: {
        type: Date
    }
});

export default mongoose.model('Task', task);