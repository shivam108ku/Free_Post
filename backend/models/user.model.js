import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        require: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
    },
    fullName:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
        minLength: 6,
        maxLength: 60,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId, //
            ref:"User",
            default:[] 
        }
    ],
     following:[
        {
            type: mongoose.Schema.Types.ObjectId, //
            ref:"User",
            default:[] 
        }
    ],
    profileImg:{
        type: String,
        default: "",
    },
     coverImg:{
        type: String,
        default: "",
    },
    bio:{
        type: String,
        default: "",
    },
    link:{
        type: String,
        default: "",
    },

}, {timestamps:true});

const User = mongoose.model("User",userSchema);
 
export default User;

