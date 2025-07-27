import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import * as eventController from '../controllers/eventController';

const router = Router();

const eventValidation = [
  body('name').isString().notEmpty(),
  body('type').isIn(['track', 'identify', 'alias', 'screen', 'page']),
  body('description').isString().notEmpty(),
];

router.post('/', eventValidation, validate, eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.put('/:id', eventValidation, validate, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;
