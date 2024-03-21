"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const db_1 = __importDefault(require("./db"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const port = process.env.PORT || 3002;
const app = (0, express_1.default)();
// Connect to MongoDB database using Mongoose
(0, db_1.default)();
// Set up static files and views
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// Middleware and Routers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// Allow cross-origin requests (for testing purposes)
app.use((0, cors_1.default)());
// Routes
app.use(index_routes_1.default);
// Use the redirect route
// app.use('/', redirectRoute);
app.get("/", (req, res) => {
    res.render('landingPage');
});
// Route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).render('404');
});
app.listen(port, () => console.log(`listening on port ${port}`));
exports.default = app;
