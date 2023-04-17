import { Router } from "express";
import { getTypeEffectivenessController } from "../dependency-injection";

const ctrl = getTypeEffectivenessController();

const router = Router({
  mergeParams: true
});

const routes = {
  createTypeEffectiveness: "/type-effectiveness",
};

router.post(
    routes.createTypeEffectiveness,
    ctrl.createTypeOrUpdateEffectiveness()
);

export default router;