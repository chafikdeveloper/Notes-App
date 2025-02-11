import bcrypt from "bcryptjs";
import prisma from "../database.js";
import { generateToken } from "../utils/createToken.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const findUser = await prisma.user.findUnique({ where: { email } });

    if (findUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exist",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 12),
      },
    });

    res.status(201).json({
      status: "success",
      message: "Profile created successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        status: "error",
        message: "Bad credentials",
      });
    }

    const token = generateToken(res, user.id);

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
