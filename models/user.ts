import mongoose, { Schema } from 'mongoose';

let user = new Schema({
    name:        {
        type: String, required: true
    }, email:    {
        type: String, required: true
    }, password: {
        type: String, required: true
    }, since:    {
        type: Date, default: Date.now
    }
});

const User = mongoose.model('User', user);

export default User;
