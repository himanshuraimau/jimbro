import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { comparePasswords } from "@/utils/password";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await loginUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function loginUserHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid inputs" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullName: true,
        email: true,
        password: true,
      },
    });

    if (user && await comparePasswords(password, user.password)) {
      return res.status(200).json(exclude(user, ["password"]));
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Function to exclude user password returned from prisma
function exclude<T, Key extends keyof T>(user: T, keys: Key[]): Omit<T, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
