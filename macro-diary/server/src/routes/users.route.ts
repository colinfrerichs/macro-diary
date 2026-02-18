import { Router } from "express"
import { signUp } from "../controllers/users.controller"

const router = Router()

router.post("/", signUp)

export default router
