import Router from "../framework/Router.js";
import { getUser } from "./user-controller.js";
import { createUser } from "./user-controller.js";

const router = new Router();

router.get("/users", (req, res) => {
  getUser(req, res);
});

router.post("/users", (req, res) => {
  createUser(req, res);
});

export default router;
