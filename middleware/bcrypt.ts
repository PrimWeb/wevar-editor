import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema({name: String});

export const hash = (string: string):string|false => {
    if (string) {
        let salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(string, salt);
    }
    return false
};

export const sign = (string:string, stringHash:string):false => {
    if (string) {
        return bcrypt.compareSync(string, stringHash);
    }
    return false;
};

