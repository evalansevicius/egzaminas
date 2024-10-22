import mongoose from 'mongoose';
const {Schema} = mongoose
const userSchema = new Schema({
    userID: { type: Number, unique: true, required: true},
    name: { type: String,  unique: true},
    email: { type: String, unique: true},
    password: { type: String},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;