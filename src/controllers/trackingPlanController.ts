import { Request, Response } from 'express';
import { TrackingPlan } from '../models/TrackingPlan';
import { Event } from '../models/Event';
import { Property } from '../models/Property';

export const createTrackingPlan = async (req: Request, res: Response) => {
  try {
    const { name, description, events } = req.body;

    // Validate and create/find events and properties
    for (const eventData of events) {
      // Check if event exists, if not create it
      const existingEvent = await Event.findOne({ 
        name: eventData.name, 
        type: 'track' // Default type for tracking plan events
      });
      
      if (!existingEvent) {
        await Event.create({
          name: eventData.name,
          type: 'track',
          description: eventData.description
        });
      } else if (existingEvent.description !== eventData.description) {
        return res.status(409).json({ 
          error: `Event ${eventData.name} exists with different description` 
        });
      }

      // Check properties
      for (const propData of eventData.properties) {
        const existingProperty = await Property.findOne({
          name: propData.name,
          type: propData.type
        });

        if (!existingProperty) {
          await Property.create({
            name: propData.name,
            type: propData.type,
            description: propData.description
          });
        } else if (existingProperty.description !== propData.description) {
          return res.status(409).json({ 
            error: `Property ${propData.name} exists with different description` 
          });
        }
      }
    }

    const trackingPlan = new TrackingPlan({ name, description, events });
    await trackingPlan.save();
    res.status(201).json(trackingPlan);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'TrackingPlan with this name already exists' });
    }
    res.status(400).json({ error: error.message });
  }
};

export const getTrackingPlans = async (req: Request, res: Response) => {
  try {
    const trackingPlans = await TrackingPlan.find();
    res.json(trackingPlans);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrackingPlan = async (req: Request, res: Response) => {
  try {
    const trackingPlan = await TrackingPlan.findById(req.params.id);
    if (!trackingPlan) return res.status(404).json({ error: 'TrackingPlan not found' });
    res.json(trackingPlan);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTrackingPlan = async (req: Request, res: Response) => {
  try {
    req.body.update_time = new Date();
    const trackingPlan = await TrackingPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trackingPlan) return res.status(404).json({ error: 'TrackingPlan not found' });
    res.json(trackingPlan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTrackingPlan = async (req: Request, res: Response) => {
  try {
    const trackingPlan = await TrackingPlan.findByIdAndDelete(req.params.id);
    if (!trackingPlan) return res.status(404).json({ error: 'TrackingPlan not found' });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
