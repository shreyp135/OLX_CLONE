import mongoose from "mongoose";

const schema = mongoose.Schema;

const listingSchema = new schema ({
    listingName : {
        type: String,
        required: true, 
    },
    description : String,
    price : Number,
    sold:{
        type: Boolean,
        default: false,
    },
    owner: {
        type : schema.Types.ObjectId,
        ref: "user",
    }
});

const listing  = mongoose.model("listing", listingSchema );

export default listing;