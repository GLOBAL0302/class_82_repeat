import express from "express"
import { Error } from "mongoose";
import User from "../modules/User";
import TrackHistory from "../modules/TrackHistory";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post("/", async(req, res, next)=>{
    try{
        const token = req.get("Authorization");
        console.log(token);
        if(!token){
            res.status(401).send({error:"No Token Present, Unauthorized"});
            return
        }
        const user = await User.findOne({token});

        if(!user){
            res.status(401).send({error:"Wrong Token"});
            return
        }

        const newTrackHistory = {
            user:user._id,
            track:req.body.track
        }

        const trackHistory = await new TrackHistory(newTrackHistory);
        trackHistory.save();
        
        res.send({
            message: "trackhistory Updated",
            trackHistory
        })

    }catch(e){
        if(e instanceof Error.ValidationError){
            res.status(400).send({error:e})
        }
        next();
    }
});

export default trackHistoriesRouter
