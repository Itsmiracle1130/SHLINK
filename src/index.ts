import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes";
import connectMongoDb from './db'
import { CustomRequest } from "./utils/Interface";
import path from 'path'
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

declare global {
  namespace Express {
    interface Request extends CustomRequest { }
  }
}


// Routes
app.use(router);

// Use the redirect route
// app.use('/', redirectRoute);

app.get("/", (req: Request, res: Response) => {
  res.render('landingPage');
});

// Route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(port, () => console.log(`listening on port ${port}`));

export default app;