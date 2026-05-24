import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
});

const contentSchema = new Schema({
    link: {type: String, require: true},
    title: String,
    type: String,
    tags: {type: mongoose.Types.ObjectId, ref: 'Tags'},
    userId: {type: mongoose.Types.ObjectId, ref: 'Users', require: true},
});

const linkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'Users', unique: true, require: true}
});

const tagSchema = new Schema({
    title: {type: String, unique: true, require: true}
});

export const userModel = model("Users", userSchema);
export const contentModel = model("Contents", contentSchema);
export const linkModel = model("Links", linkSchema);
export const tagModel = model("Tags", tagSchema);