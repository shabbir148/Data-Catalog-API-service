import { Request, Response } from 'express';
import { Property } from '../models/Property';

export const createProperty = async (req: Request, res: Response) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Property with this name and type already exists' });
    }
    res.status(400).json({ error: error.message });
  }
};

export const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    req.body.update_time = new Date();
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
