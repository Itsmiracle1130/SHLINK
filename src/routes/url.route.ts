
import {Router} from "express"
import { shortenUrl, getUrlById, verifyUrl} from "../controllers/url.controller"
import Authentication from "../middleware/verifyToken"

const {verifyToken}= Authentication

const router = Router()

router.post( "/shorten", verifyToken, shortenUrl)
router.get("/user/:userId", getUrlById)
router.get("/:shortCode", verifyUrl)

export default router

