import { model, Schema } from 'mongoose';
import Dev from '../interfaces/dev';

const devSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: {
      type: String,
      required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
  }, {
    timestamps: true, 
  }
);

export default model<Dev>('Dev', devSchema);