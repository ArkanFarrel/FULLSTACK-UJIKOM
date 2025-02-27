import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import User from "../model/UserModel.js";
import dotenv from "dotenv"

dotenv.config()

export const login = async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({where: {email} })
        if(!user){
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                msg: "Invalid password"
            })
        }

        const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        )
        return res.status(200).json({
            msg: "Login successful",
            token,
        });
    } catch (error){
        return res.status(500).json({
            msg: "Login failed", error: error.message
        })
    }
}


export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.status(201).json({
            msg: "User created successfully",
            user: newUser,
        })
    } catch ( error ){
        return res.status(500).json({
            msg: "Registration failed", error: error.message,
        })
    }
}