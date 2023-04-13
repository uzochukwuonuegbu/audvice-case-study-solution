import { Router } from "express";
import { TypeController } from "../controllers/type.controller";

const ctrl = new TypeController();

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
  ctrl.getType()
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