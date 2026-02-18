import { Request, Response } from "express"
import { findUserByEmail } from "../models/users.model"
import jwt from "jsonwebtoken"

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Missing email or password." })

    const user = await findUserByEmail(email)
    if (!user) return res.status(400).json({ message: "Invalid credentials." })

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    )

    return res.status(201).json({ token, user: { id: user.id, email: user.email }})
}
