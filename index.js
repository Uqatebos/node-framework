import bodyParser from "./framework/bodyParser.js";
import { config } from "dotenv";
import userRouter from "./src/user-router.js";
import Application from "./framework/Application.js";
import parseJson from "./framework/parseJson.js";
const app = new Application();

app.use(bodyParser);
app.use(parseJson);

config();

const PORT = process.env.PORT || 5000;

app.addRouter(userRouter);

app.listen(PORT, () => {
  console.log(`Сервер работает на порте ${PORT}`);
});
