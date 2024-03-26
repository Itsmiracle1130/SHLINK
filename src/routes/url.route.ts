
import {Request, Response, Router} from "express"
import { shortenUrl, customURL, viewLink, viewLinks, getURLAnalytics} from "../controllers/url.controller"
import {verifyToken} from "../middleware/verifyToken"
import rateLimit from "express-rate-limit";
import { userModel } from "../model/user.model";
import { urlModel } from "../model/url.model";

const router = Router()

const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000,
	max: 3, 
	standardHeaders: true,
	legacyHeaders: false,
});

router.use("/shorten", limiter)

router.get("/shorten", verifyToken, async (req: Request, res: Response) => {
	const user = await userModel.findOne({ email: req.user.email }).select("-password");
	res.render("createUrl", ({
		user
	}));
})

router.get("/custom", verifyToken, async (req: Request, res: Response) => {
	res.render("customUrl");
})

router.get("/dashboard", verifyToken, async (req: Request, res: Response)=> {
	const user = await userModel.findOne({ email: req.user.email })
	res.render("dashboard", {
		user
	})
})

router.post( "/shorten", verifyToken, shortenUrl)
router.post("/custom", verifyToken, customURL);
router.get("/", verifyToken, viewLinks);
router.get("/:shortCode", viewLink);
router.get("/analytics/:shortCode", verifyToken, getURLAnalytics);
export default router

