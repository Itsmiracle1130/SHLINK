import express, {Express, Request, Response} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes";
import connectMongoDb from './db'
import redirectRoute from "./middleware/redirect"
import { CustomRequest } from "./utils/Interface";
import path from 'path'
import {GET} from './auth/route.auth'
import auth0Middleware from './auth/auth0'
dotenv.config();
const port = process.env.PORT || 3002

const app: Express = express();

// Connect to MongoDB database using Mongoose

connectMongoDb();

// Set up static files and views
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware and Routers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Allow cross-origin requests (for testing purposes)
app.use(cors());

// app.use(auth0Middleware)

declare global {
  namespace Express {
    interface Request extends CustomRequest { }
  }
}


// Routes
app.use(router);

const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000,
	max: 3, 
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(limiter())
// Use the redirect route
// app.use('/', redirectRoute);

app.get("/", (req: Request, res: Response) => {
  res.render('landingPage');
});

app.get("/", (req: Request, res: Response) => {
  res.send("Error 404")
})

app.listen(port, () => console.log(`listening on port ${port}`));

export default app;