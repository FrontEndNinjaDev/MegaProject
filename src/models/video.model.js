import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile : {
        type : String ,
        required : true ,
    },
    thumbnail : {
        type : String ,
        required : true 
    },
    title : {
        type : String ,
        required : true 

    }, 
    description : {
        type : String ,
        required : true 
    },
    duration  : {
        type : Number ,
        required : true 
    },
    views : {
        type : Number ,
        default : 0 
    },
    isPublished  : {
        type : Boolean ,
        default : true 
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
},{timestamps : true })

// the mongoose-aggregate-paginate plugin, which provides pagination functionality for Mongoose aggregate queries.
/* This method paginates the results of an aggregation query.
Options:
page: The current page number.
limit: The number of results per page. */

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video' , videoSchema)