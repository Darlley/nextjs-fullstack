// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';
import { ObjectId } from 'mongodb';

interface ErrorResponseType {
  error: string;
}
interface SuccessRepsonseType {
  _id: number;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
  coins: number;
  courses: Array<string>;
  available_hours: object;
  available_locations: Array<string>;
  reviews: Array<object>;
  appointments: Array<object>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessRepsonseType>
): Promise<void> {
  if (req.method === 'GET') {
    const id = new ObjectId(req.body.id);

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

    res.status(200).json({ result });
  } else {
    res.status(400).json({ error: 'Bad reqest' });
  }
}
