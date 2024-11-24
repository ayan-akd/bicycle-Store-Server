import express from 'express';
import { BicycleController } from './bicycle.controller';

const router = express.Router();

router.post('/', BicycleController.createBicycle);
router.get('/', BicycleController.getAllBicycles);
router.get('/:productId', BicycleController.getSingleBicycle);
router.put('/:productId', BicycleController.updateBicycle);
router.delete('/:productId', BicycleController.deleteBicycleFromDB);

export const BicycleRoutes = router;
