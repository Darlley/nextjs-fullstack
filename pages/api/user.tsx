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
  courses: [];
  available_hours: string;
  available_locations: string;
  reviews: [];
  appointments: [];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessRepsonseType>
): Promise<void> {
  if (req.method === 'POST') {
    const {
      name,
      email,
      cellphone,
      teacher,
      courses,
      available_hours,
      available_locations,
    } = req.body;

    if (
      (!name ||
        !email ||
        !cellphone ||
        !courses ||
        !available_hours ||
        !available_locations) &&
      teacher === undefined
    ) {
      return res.status(400).json({ error: 'Empty parameters request' });
    }

    const { db } = await connect();
    const responses = await db.collection('users').insertOne({
      name,
      email,
      cellphone,
      teacher,
      coins: 1,
      courses: courses || [],
      available_hours: available_hours || {},
      available_locations: available_locations || [],
      reviews: [],
      appointments: [],
    });
    const result = await db.collection('users').findOne(responses.insertedId);
    return res.status(200).json(result);
  } else if (req.method === 'GET') {
    const { db } = await connect();
    const result = await db.collection('users').findOne("6359a8516f024cca9760779b");
    res.status(400).json(result);
  } else {
    res.status(400).json({ error: 'Bad request' });
  }
}
