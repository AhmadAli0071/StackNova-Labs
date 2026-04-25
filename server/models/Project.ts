import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  client: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  isFeatured: boolean;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: String, required: true },
    category: { type: String, required: true },
    technologies: [{ type: String }],
    imageUrl: { type: String, default: '' },
    liveUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'upcoming'],
      default: 'completed',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', projectSchema);
