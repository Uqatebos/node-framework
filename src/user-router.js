import Router from "../framework/Router.js";


const router = new Router();

const users = [
  { id: 1, name: "Gabe" },
  { id: 2, name: "Aboba" },
];

router.get("/users", (req, res) => {
  res.send(users);
});

router.post("/users", (req, res) => {
  console.log(req.body, "15");
  const user = req.body;
  users.push(user);
  res.send(user);
});

export default router;
