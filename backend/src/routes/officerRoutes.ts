import express from 'express';
import { PrismaClient } from '@prisma/client';
import { number, z } from 'zod';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/authMiddleware';

const JWT_SECRET = "WASTE_MANAGEMENT_SYSTEM"

export const officerRouter = express.Router();
const prisma = new PrismaClient();

const officerSignupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    adhaar: z.string(),
    number: z.string()
});

const officerLoginSchema = z.object({
    username: z.string(),
    password: z.string()
});

officerRouter.post("/signup",async(req,res)=>{
    const { username, email, password, adhaar, number } = req.body;

    const parseResult = officerSignupSchema.safeParse({ username, email, password, adhaar, number });

    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid inputs", errors: parseResult.error.errors });
    }

    try{
        const existingUser = await prisma.officer.findUnique({
            where : {
                username
            }
        })

        const existingEmail = await prisma.officer.findUnique({
            where : {
                email
            }
        })

        if(existingUser || existingEmail){
            return res.json({message : "cleaner already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const officer = await prisma.officer.create({
            data : {
                username,
                password : hashedPassword,
                email,
                adhaar,
                number
            }
        })

        const token =  sign({username,role : "officer"},JWT_SECRET);

        return res.json({message : "user created successfully",token,user:officer})

    }catch(error){
        console.log(error);
        return res.json({message : "cannot create user"})
    }

})

officerRouter.post("/login",async(req,res)=>{
    const {username,password} = req.body;

    const { success } = officerLoginSchema.safeParse({username,password});

    if(!success){
        return res.json({message : "invalid inputs"})
    }

    try{
        const officer = await prisma.officer.findUnique({
            where : {
                username
            }
        })

        if(!officer){
            return res.json({message : "officer does not exist"})
        }

        const passwordMatch = await bcrypt.compare(password,officer.password);

        if(!passwordMatch){
            return res.json({message : "invalid password"})
        }

        const token = sign({username,role : "officer"},JWT_SECRET);

        return res.json({message : "login successful",token,user:officer})

    }catch(error){
        console.log(error);
        return res.json({message : "cannot login"})
    }
})

officerRouter.get("/complaints",authMiddleware,async(req,res)=>{
    const role = req.body.user.role;
    if(role !== "officer"){
        return res.json({message : "unauthorized"})
    }
    try{
        const complaints = await prisma.complaint.findMany({
            include : {
                raisedBy : true,
                cleanedBy : true,
                address : true
            }
        });

        return res.json({complaints})
    }catch(error){
        console.log(error);
        return res.json({message : "cannot fetch complaints"})
    }
})

officerRouter.get("/users",authMiddleware,async(req,res)=>{
    const role = req.body.user.role;
    if(role !== "officer"){
        return res.json({message : "unauthorized"})
    }
    try{
        const users = await prisma.user.findMany();

        return res.json({users})
    }catch(error){
        console.log(error);
        return res.json({message : "cannot fetch users"})
    }
})

officerRouter.get("/cleaners",authMiddleware,async(req,res)=>{
    const role = req.body.user.role;
    if(role !== "officer"){
        return res.json({message : "unauthorized"})
    }
    try{
        const cleaners = await prisma.cleaner.findMany();

        return res.json({cleaners})
    }catch(error){
        console.log(error);
        return res.json({message : "cannot fetch cleaners"})
    }
})

officerRouter.get("/under-evaluation-complaints",async(req,res)=>{
    try{
        const complaints = await prisma.complaint.findMany({
            where : {
                status : "underEvaluation"
            },
            include : {
                address : true
            }
        })

        return res.json({complaints})
    }
    catch(error){
        console.log(error)
        return res.json({message : "cannot get complaints"})
    }
})

officerRouter.put("/evaluate",async (req,res)=>{
    const complaintId = req.body.complaintId;
    const status = req.body.status;

    try{
        await prisma.complaint.update({
            where : {
                id : complaintId
            },
            data : {
                status : status
            }
        })
        return res.json({message : "evaluation complete"})
    }
    catch(error){
        console.log(error);
        return res.json({message : "evaluation failed"})
    }
})