import mongoose, {Schema} from "mongoose";
import { IUrl } from "../utils/Interface";

const urlSchema = new Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String
    },
    shortCode : {
      type: String,
      unique: true
  },
  userId : {
      type: Schema.Types.ObjectId, ref: "User"
  },
  clickCount : {
      type : Number,
      default: 0
  },
  QRCode :{
      type: String
  }
  },
  {
    timestamps: true,
  }
);

// export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);

export const urlModel = mongoose.model<IUrl>("Url", urlSchema)
