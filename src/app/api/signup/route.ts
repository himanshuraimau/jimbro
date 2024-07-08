import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { saltAndHashPassword } from "@/utils/password";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  const { fullName, email, password } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: "Invalid inputs" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password length should be more than 6 characters" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: { fullName, email, password: hashedPassword },
    });

    return res.status(201).json({ user });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
