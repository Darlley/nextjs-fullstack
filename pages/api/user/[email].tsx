// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/database';

interface ErrorResponseType {
  error: string;
}
interface SuccessRepsonseType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
  coins: number;
  courses: Array<string>;
  available_hours: Record<string, number[]>;
  available_locations: Array<string>;
  reviews: Record<string, unknown>[];
  appointments: {
    date: string;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessRepsonseType>
): Promise<void> {
  if (req.method === 'GET') {
    const { email } = req.query;
    if (!email) {
      res.status(400).json({ error: 'Not found required email' });
      return;
    }

    const { db } = await connect();
    const result = await db.collection('users').findOne({ email });
    if (!result) {
      return res.status(400).json({ error: 'Not found this email' });
    }

    res.status(400).json(result);
  } else {
    res.status(400).json({ error: 'Bad reqest' });
  }
}
