import mongoose, { ConnectOptions } from 'mongoose';

let options: ConnectOptions = new Object({
    useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true,
});

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.mongodburl, options);
    return handler(req, res);
};

export default connectDB;
