import dbConnect from '../lib/mongooseConnect'
import { User } from "../models/User";

export async function getUsers() {
    try {
        await dbConnect();
        const users = await User.find({});
        if (users) return users;
    }
    catch (err) {
        console.error(err);
    }
    return
}