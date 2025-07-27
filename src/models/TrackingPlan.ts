import mongoose, { Schema, Document } from 'mongoose';

interface ITrackingPlanProperty {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ITrackingPlanEvent {
  name: string;
  description: string;
  properties: ITrackingPlanProperty[];
  additionalProperties: boolean;
}

export interface ITrackingPlan extends Document {
  name: string;
  description: string;
  events: ITrackingPlanEvent[];
  create_time: Date;
  update_time: Date;
}

const trackingPlanSchema = new Schema<ITrackingPlan>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  events: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    properties: [{
      name: { type: String, required: true },
      type: { type: String, required: true },
      required: { type: Boolean, required: true },
      description: { type: String, required: true }
    }],
    additionalProperties: { type: Boolean, required: true }
  }],
  create_time: { type: Date, default: Date.now },
  update_time: { type: Date, default: Date.now }
});

export const TrackingPlan = mongoose.model<ITrackingPlan>('TrackingPlan', trackingPlanSchema);

