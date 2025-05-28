const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email :{ type: string, required: true, unique: true},
    password : { type:'string, required: true'}
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
