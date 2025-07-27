import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  type: 'track' | 'identify' | 'alias' | 'screen' | 'page';
  description: string;
  create_time: Date;
  update_time: Date;
}

const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['track', 'identify', 'alias', 'screen', 'page'] 
  },
  description: { type: String, required: true },
  create_time: { type: Date, default: Date.now },
  update_time: { type: Date, default: Date.now }
});

eventSchema.index({ name: 1, type: 1 }, { unique: true });

export const Event = mongoose.model<IEvent>('Event', eventSchema);
