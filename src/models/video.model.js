import mongoose from, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {type: String,//cloudinary
    required: true},
    thumbnail: {type: String,//cloudinary
    required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, //cloudinary
    required: true}, 
    views: {type: Number, default: 0},
    isPublished: {type: Boolean, default: false},
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true});

videoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", videoSchema);

export default Video;

