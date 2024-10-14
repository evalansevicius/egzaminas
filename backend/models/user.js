import mongoose from 'mongoose';
const {Schema} = mongoose
const userSchema = new Schema({
    userID: { type: Number, unique: true, required: true},
    name: { type: String,  unique: true},
    email: { type: String, unique: true},
    password: { type: String}
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;