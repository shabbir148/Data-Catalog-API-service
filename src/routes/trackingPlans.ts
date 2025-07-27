import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import * as trackingPlanController from '../controllers/trackingPlanController';

const router = Router();

const trackingPlanValidation = [
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('events').isArray().notEmpty(),
  body('events.*.name').isString().notEmpty(),
  body('events.*.description').isString().notEmpty(),
  body('events.*.properties').isArray(),
  body('events.*.additionalProperties').isBoolean(),
];

router.post('/', trackingPlanValidation, validate, trackingPlanController.createTrackingPlan);
router.get('/', trackingPlanController.getTrackingPlans);
router.get('/:id', trackingPlanController.getTrackingPlan);
router.put('/:id', trackingPlanValidation, validate, trackingPlanController.updateTrackingPlan);
router.delete('/:id', trackingPlanController.deleteTrackingPlan);

export default router;

