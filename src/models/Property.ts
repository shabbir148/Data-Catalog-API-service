import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  name: string;
  type: 'string' | 'number' | 'boolean';
  description: string;
  create_time: Date;
  update_time: Date;
}

const propertySchema = new Schema<IProperty>({
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['string', 'number', 'boolean'] 
  },
  description: { type: String, required: true },
  create_time: { type: Date, default: Date.now },
  update_time: { type: Date, default: Date.now }
});

propertySchema.index({ name: 1, type: 1 }, { unique: true });

export const Property = mongoose.model<IProperty>('Property', propertySchema);

