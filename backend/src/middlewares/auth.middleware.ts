import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../services/jwt.service';

export interface AuthRequest extends Request {
  userId?: string;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized - No token provided' });
      return;
    }

    const decoded = await verifyJWT(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}
