import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        birthDate: true,
        birthTime: true,
        birthPlace: true,
        vipTier: true,
        vipExpiresAt: true,
        createdAt: true
      }
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const data = req.body;
    console.log('Updating profile with data:', data);

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        birthDate: new Date(data.birthDate),
        birthTime: data.birthTime,
        birthPlace: data.birthPlace,
      },
      select: {
        id: true,
        email: true,
        name: true,
        birthDate: true,
        birthTime: true,
        birthPlace: true,
        vipTier: true,
        vipExpiresAt: true,
        createdAt: true
      }
    });

    console.log('Updated user:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
