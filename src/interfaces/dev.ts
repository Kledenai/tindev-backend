import { Schema } from 'mongoose';

interface Dev {
  name: string,
  username: string,
  bio: string,
  avatar: string,
  likes?: Schema.Types.ObjectId,
  dislikes?: Schema.Types.ObjectId,
  timestamps: Date
} 

export default Dev
