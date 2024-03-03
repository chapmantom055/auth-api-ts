require('dotenv').config();
import express from "express";
import config from 'config'
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

const port = config.get<number>('port');

app.use(express.json());

app.use(deserializeUser);

router(app);

app.listen(port, () => {
    log.info(`App started at http://localhost:${port}`);

    connectToDb();
});