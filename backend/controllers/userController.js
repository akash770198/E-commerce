import zod from 'zod'
import userModel from '../models/userModel.js'
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const signupSchema = zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.string().email("Invalid email"),
    password: zod.string().min(5, "Password must be atleast 5 digits")
})

const signinSchema = zod.object({
    email: zod.string().email("Invalid email"),
    password: zod.string().min(5, "Passwod must be atleast 5 digits")
})

// Route for user login
const loginUser = async (req, res) => {
    try {
        const validation = signinSchema.safeParse(req.body)

        if (!validation.success) {
            const error = validation.error.issues[0].message

            return res.status(400).json({
                success: false,
                message: error
            })
        }

        const { email, password } = validation.data

        const user = await userModel.findOne({
            email: email
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Enter correct password"
            })
        }

        const token = createToken(user._id)

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const validation = signupSchema.safeParse(req.body)

        if (!validation.success) {

            const error = validation.error.issues[0].message;

            return res.status(400).json({
                success: false,
                message: error
            })
        }

        const { name, email, password } = validation.data

        const exists = await userModel.findOne({
            email: email
        })

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.status(200).json({
            success: true,
            message: 'User created successfuly',
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })
        }
        else{
            res.json({
                success: false,
                message: "Incorrect creds"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

export { loginUser, registerUser, adminLogin }