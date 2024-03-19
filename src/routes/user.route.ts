import { Router, Request, Response } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller";

const router = Router()

router.get("/login", (req: Request, res: Response) => {
    res.render('login');
  });
  
  router.get("/signup", (req: Request, res: Response) => {
    res.render('signup');
  });

router.post("/signup", registerUser); //register a new user
router.post("/login", loginUser); //login a user
router.get("/logout", logoutUser); //logout a user

export default router;