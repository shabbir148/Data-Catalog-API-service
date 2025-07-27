import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import * as propertyController from '../controllers/propertyController';

const router = Router();

const propertyValidation = [
  body('name').isString().notEmpty(),
  body('type').isIn(['string', 'number', 'boolean']),
  body('description').isString().notEmpty(),
];

router.post('/', propertyValidation, validate, propertyController.createProperty);
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getProperty);
router.put('/:id', propertyValidation, validate, propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

export default router;
