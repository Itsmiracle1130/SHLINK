"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
// const redisPort = 6379;
const client = (0, redis_1.createClient)();
// Check cache for shortened URL
// const checkCache = (req: Request, res: Response, next: NextFunction): void => {
//   const { id } = req.params;
//   client.get(id, (err: Error | null, data: string | null) => {
//     if (err) {
//       console.error("Error in Redis:", err);
//       next();
//     }
//     if (data) {
//       console.log("Cache hit:", data);
//       res.redirect(data); // Redirect to cached URL
//     } else {
//       next();
//     }
//   });
// };
// export default checkCache;
() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected to Redis server");
    }
    catch (error) {
        console.error("Error connecting to Redis: " + error);
        process.exit(1); //Exit if connection fails
    }
});
exports.default = client;
