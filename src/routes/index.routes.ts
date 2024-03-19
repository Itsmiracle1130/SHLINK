import { Router } from "express";
import user from "./user.route";
import url from "./url.route"

const router = Router();

router.use('/users', user)
router.use('/', url)

export default router;