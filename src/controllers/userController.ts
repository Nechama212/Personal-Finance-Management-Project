import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { Email: req.params.email }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const checkExistingUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', (error as Error).message);
    res.status(400).json({ error: (error as Error).message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, UserName, Password, Language } = req.body;
    const newUser = await prisma.user.create({
      data: { Email, UserName, Password, Language }
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', (error as Error).message);
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { Email: req.params.email },
      data: req.body
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { Email: req.params.email }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
