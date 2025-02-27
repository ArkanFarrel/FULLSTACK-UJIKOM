import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()


export const verifyToken = (req, res, next ) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        console.log("Authorization header not found")
        return res.status(403).json({
            msg: "No Token Provided",
        });
    }
    const token = authHeader.startsWith("Bearer") ? authHeader.substring(7, authHeader.length) : authHeader
    if (!token){
        console.log("Token is not found in header");
        return res.status(403).json({
            msg: "Token Missing"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "farrelbisa1234");
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Token Verification Failed:", error.message);
        return res.status(401).json({
            msg: "Unauthorized or Invalid Token",
        })
    }
};

// export const verifyToken = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]
//     if (!token) {
//         res.status(403).json('token not found')
//     } else {
//         jwt.verify(token, process.env.SECRET_ACCESS_TOKEN,async (err, decode) => {
//             if (err) res.status(403).json('the token is incorrect or has expired') 
//             if (decode) {
//                 next()
//             }
//             else {
//                 res.status(404).json('not found')
//             }

//         })
//     }

// }
