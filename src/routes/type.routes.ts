import { Router } from "express";
import { getTypeController } from "../dependency-injection";

const ctrl = getTypeController();

const router = Router({
  mergeParams: true
});

const routes = {
  createType: "/type",
  getType: "/type",
  getTypeById: "/type/:id",
  updateType: "/type/:id",
  deleteType: "/type/:id",
};

router.post(
    routes.createType,
    ctrl.createType()
);

router.get(
  routes.getType,
  ctrl.getTypeCounters()
);

router.get(
  routes.getTypeById,
  ctrl.getTypeById()
);

router.put(
  routes.updateType,
  ctrl.updateType()
);

router.delete(
  routes.deleteType,
  ctrl.deleteType()
);

export default router;