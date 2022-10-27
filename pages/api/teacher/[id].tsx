// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/database';
import { ObjectId } from 'mongodb';

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
    const id = new ObjectId(req.query.id as string);

    if (!id) {
      res.status(400).json({ error: 'Not found required id' });
      return;
    }

    const { db } = await connect();
    const result = await db.collection('users').findOne({
      _id: id,
    });

    if (!result) {
      return res.status(400).json({ error: 'Not found this id' });
    }

    res.status(200).json(result);
  } else {
    res.status(400).json({ error: 'Bad reqest' });
  }
}
