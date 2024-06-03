import mongoose, {  model, models, Schema, Document} from "mongoose";


export interface IUser extends Document {
    clerakId: String;
    email: string;
    username: string;
    photo: string;
    firstname?: string;
    lastname?: string;
    planId?: number;
    creditBalance?: number;
}
const userSchema = new Schema({
    clerakId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    planId: {
        type: Number,
        default: 1
    },
    creditBalance: {
        type: Number,
        default: 10,
    },
})

// const User = models.User || model('User', UserSchema )
const User = models?.User || model('User', userSchema);
export default User
