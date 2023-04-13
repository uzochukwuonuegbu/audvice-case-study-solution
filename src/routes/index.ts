import { Router } from "express";
import routes from "./type.routes";

const router = Router();

router.use(
  routes,
);

export default router;