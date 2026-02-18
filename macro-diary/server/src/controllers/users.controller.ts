import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createUser, findUserByEmail } from "../models/users.model"

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Missing email or password." })
    
    const existingUser = await findUserByEmail(email)
    if (existingUser) return res.status(400).json({ message: "Email already in use." })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await createUser({ email, hashedPassword })

    const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    )

    return res.status(201).json({ token, user: { id: newUser.id, email: newUser.email }})
}