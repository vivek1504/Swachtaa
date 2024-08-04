"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.officerRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const JWT_SECRET = "WASTE_MANAGEMENT_SYSTEM";
exports.officerRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const officerSignupSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    adhaar: zod_1.z.string(),
    number: zod_1.z.string()
});
const officerLoginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.officerRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, adhaar, number } = req.body;
    const parseResult = officerSignupSchema.safeParse({ username, email, password, adhaar, number });
    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid inputs", errors: parseResult.error.errors });
    }
    try {
        const existingUser = yield prisma.officer.findUnique({
            where: {
                username
            }
        });
        const existingEmail = yield prisma.officer.findUnique({
            where: {
                email
            }
        });
        if (existingUser || existingEmail) {
            return res.json({ message: "cleaner already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const officer = yield prisma.officer.create({
            data: {
                username,
                password: hashedPassword,
                email,
                adhaar,
                number
            }
        });
        const token = (0, jsonwebtoken_1.sign)({ username, role: "officer" }, JWT_SECRET);
        return res.json({ message: "user created successfully", token, user: officer });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot create user" });
    }
}));
exports.officerRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const { success } = officerLoginSchema.safeParse({ username, password });
    if (!success) {
        return res.json({ message: "invalid inputs" });
    }
    try {
        const officer = yield prisma.officer.findUnique({
            where: {
                username
            }
        });
        if (!officer) {
            return res.json({ message: "officer does not exist" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, officer.password);
        if (!passwordMatch) {
            return res.json({ message: "invalid password" });
        }
        const token = (0, jsonwebtoken_1.sign)({ username, role: "officer" }, JWT_SECRET);
        return res.json({ message: "login successful", token, user: officer });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot login" });
    }
}));
exports.officerRouter.get("/complaints", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.body.user.role;
    if (role !== "officer") {
        return res.json({ message: "unauthorized" });
    }
    try {
        const complaints = yield prisma.complaint.findMany({
            include: {
                raisedBy: true,
                cleanedBy: true,
                address: true
            }
        });
        return res.json({ complaints });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot fetch complaints" });
    }
}));
exports.officerRouter.get("/users", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.body.user.role;
    if (role !== "officer") {
        return res.json({ message: "unauthorized" });
    }
    try {
        const users = yield prisma.user.findMany();
        return res.json({ users });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot fetch users" });
    }
}));
exports.officerRouter.get("/cleaners", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.body.user.role;
    if (role !== "officer") {
        return res.json({ message: "unauthorized" });
    }
    try {
        const cleaners = yield prisma.cleaner.findMany();
        return res.json({ cleaners });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot fetch cleaners" });
    }
}));
exports.officerRouter.get("/under-evaluation-complaints", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaints = yield prisma.complaint.findMany({
            where: {
                status: "underEvaluation"
            },
            include: {
                address: true
            }
        });
        return res.json({ complaints });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot get complaints" });
    }
}));
exports.officerRouter.put("/evaluate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const complaintId = req.body.complaintId;
    const status = req.body.status;
    try {
        yield prisma.complaint.update({
            where: {
                id: complaintId
            },
            data: {
                status: status
            }
        });
        return res.json({ message: "evaluation complete" });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "evaluation failed" });
    }
}));
