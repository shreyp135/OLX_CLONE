const mongoose =  require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema ({
    name : {
        type: String,
        required: true, 
    },
    description : String,
    image : {
        type: String,
    },
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