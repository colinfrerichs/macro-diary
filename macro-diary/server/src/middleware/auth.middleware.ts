import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

type JwtPayload = {
    userId: string
    email: string
}

export const authenticateJWT = (req: Request & { user?: JwtPayload}, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided." })
    }

    const token = authHeader.split(" ")[1]

    try {
        const secret = process.env.JWT_SECRET as string
        const payload = jwt.verify(token, secret) as JwtPayload
        req.user = payload
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" })
    }
}
