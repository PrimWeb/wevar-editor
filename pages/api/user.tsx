import connectDB      from '../../middleware/mongodb';
import bcrypt         from '../../middleware/bcrypt';
import User           from '../../models/user';
import { ErrorProps } from "next/error";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        // Check if name, email or password is provided
        const {name, email, password} = req.body;
        if (name && email && password) {
            try {
                // Hash password to store it in DB
                var passwordhash = await bcrypt.sign(password);
                var user = new User({
                    name,
                    email,
                    password: passwordhash,
                });
                // Create new user
                var usercreated = await user.save();
                return res.status(200).send(usercreated);
            } catch (error:any) {
                return res.status(500).send(error instanceof Error?error.message:'Error Create new user');
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};