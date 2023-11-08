import { config } from "dotenv";
import Router from "./framework/Router.js";
import Application from "./framework/Application.js";

config();

const PORT = process.env.PORT || 5000;

const router = new Router();

const app = new Application();

router.get("/posts", (req, res) => {
  res.end("You send on server /posts");
});

router.get("/users", (req, res) => {
  res.end("You send on server /users");
});

app.addRouter(router);

app.listen(PORT, () => {
  console.log(`Сервер работает на порте ${PORT}`);
});
