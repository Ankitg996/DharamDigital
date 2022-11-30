import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
    {
        short_token: {
            type:Number,
            required: true,
            unique: true
        },
        name:{
            type:String,
            required: true,
            unique: true
        },
        offers:[{
            offer_url:{
                type: String
            },
            ratio_percentage:{
                type: Number
            },
            _id:false
        }],
        enabled:{
            type:Boolean,
            default: true
        },
        visitedCount:{
            type: Number,
            default:0
        }
    }
)

export default mongoose.model('campaign',campaignSchema)