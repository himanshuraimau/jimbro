import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const userSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, password } = userSchema.parse(body);

        const existingUser = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return NextResponse.json({ user: null, message: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword
            }
        });

        // Exclude the password from the response
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({ user: userWithoutPassword, message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while creating the user" }, { status: 500 });
    }
}
