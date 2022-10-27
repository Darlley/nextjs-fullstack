// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

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
    const {courses} = req.body;

    if (!courses) {
        res.status(400).json({ error: 'Not found required courses' });
        return;
    }

    const { db } = await connect();
    const result = await db.collection('users').find({ courses }).toArray();

    if (result.length === 0) {
        return res.status(400).json({ error: 'Not found this courses' });
    }

    res.status(200).json({ result });
  } else {
    res.status(400).json({ error: 'Bad reqest' });
  }
}
