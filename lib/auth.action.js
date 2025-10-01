"use server"
import connectDB from "@/db/connect"
import User from "@/models/user.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { sendEmail } from "./mailer";

export const loginUser = async (data) => {
    const { email, password } = data;
    try {
        // Finding user in DB
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) return { message: "User does not exist", status: 404 };

        // Checking password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return { message: "Incorrect Password", status: 404 };

        const token = jwt.sign({ id: user._id, name: user.name, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const data = { id: user._id, name: user.name, role: user.role, email: user.email };

        const cookieStore = await cookies();
        cookieStore.set("metaverseinfo-token", token, {
            httpOnly: true,
            secure: "lax",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return { status: 200, data: JSON.parse(JSON.stringify(data)), message: "Login successful" };
    }
    catch (err) {
        console.log(err);
        return {status: 500, message: "Something went wrong"}
    }
}

export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("metaverseinfo-token");
    redirect("/login");
}

export const registerUser = async (data) => {
    try {
    await connectDB();
    const { name, email, password } = data;
    const user = await User.findOne({ email });
    if (user) return { message: "User already exists", status: 409 };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashPassword });
    if (!newUser) return { message: "Registration Failed", status: 500 };

    const token = jwt.sign({ id: newUser._id, role: newUser.role, name: newUser.name, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const cookieStore = await cookies();
    cookieStore.set("metaverseinfo-token", token, {
        httpOnly: true,
        secure: "lax",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    await sendEmail(newUser.name, newUser.email, "register");

    return { status: 200, message: "Registration successful" };
    }
    catch (err) {
        console.log(err);
        return {status: 500, message: "Something went wrong"}
    }
}

const getToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("metaverseinfo-token");
    if (!token) return null;
    const tokenData = jwt.verify(token.value, process.env.JWT_SECRET);
    return tokenData;
}

export async function getUser() {
    const token = await getToken();
    if (!token) return null;

    await connectDB();
    const user = await User.findById(token.id).select("_id name email role").lean();
    return JSON.parse(JSON.stringify(user));
}



