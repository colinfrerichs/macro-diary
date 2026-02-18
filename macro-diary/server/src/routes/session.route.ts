import { Router } from "express";
import { signIn } from "../controllers/session.controller"

const router = Router()

router.post("/", signIn)

export default router
