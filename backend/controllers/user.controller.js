import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getUserProfile = async (req ,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password");

        if(!user) {
            return res.status(404).josn({message: "User not found"});
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error in get profile:".error.message);
    }
}

export const followUnfollowUser = async (req , res)=>{
    try {

        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()){
            return res.status(400).json({error: "You can't follow yourself"});
        }

        if(!userToModify || !currentUser) return res.status(400).json({error: "User not found"});
        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // Unfollow the user
            await User.findByIdAndUpdate(id, { $pull: {followers: req.user._id} });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            res.status(200).json({messgae: "User unfollowed sucessfully"});

        }else{
            // follow
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id} });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

            //Notification
            const notification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id,
            });

            await notification.save();
            
            res.status(200).json({messgae: "User followed sucessfully"});
        }

    } catch (error) {
        console.log("error in followUnFollower:", error.message);
        res.status(500).json({error: error.message});
    }
};

