import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

export default (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send({
        ok: false,
        error: "Access denied. No token provided"
    });

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send({
            ok: false,
            error: "Token expired"
        });
    }

    next();
}

