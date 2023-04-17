import { Router } from "express";
import { getTypeEffectivenessController } from "../dependency-injection";

const ctrl = getTypeEffectivenessController();

const router = Router({
  mergeParams: true
});

const routes = {
  createType: "/typeEffectiveness",
};

router.post(
    routes.createType,
    ctrl.createTypeOrUpdateEffectiveness()
);

export default router;