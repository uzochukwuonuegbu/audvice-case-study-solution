import { Router } from 'express';
import typeRoutes from './type.routes';
import typeEffectivenessRoutes from './typeEffectiveness.routes';

const router = Router();

router.use(
  typeRoutes,
  typeEffectivenessRoutes
);

export default router;