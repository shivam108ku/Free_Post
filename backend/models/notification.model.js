import mongoose, { mongo } from "mongoose";

const notificationSchema = new mongoose.Schema({

    from:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    to:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        require: true
    },
    type:{
        type: String,
        require: true,
        enum: ['follow','like']
    },
    read:{
        type:Boolean,
        default: false,
    },


},{timestamps: true})

const Notification = mongoose.model('Notification',notificationSchema);
export default Notification;
