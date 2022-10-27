// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

interface ErrorResponseType {
  error: string;
}
interface SuccessRepsonseType {
  date: string;
  teacher_name: string;
  teacher_id: string;
  student_name: string;
  student_id: string;
  course: string;
  location: string;
  appointment_link?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessRepsonseType>
): Promise<void> {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(400).json({ error: 'Please, login first!' });
  }
  if (req.method === 'POST') {
    const {
      date,
      teacher_name,
      teacher_id,
      student_name,
      student_id,
      course,
      location,
      appointment_link,
    }: {
      date: string;
      teacher_name: string;
      teacher_id: string;
      student_name: string;
      student_id: string;
      course: string;
      location: string;
      appointment_link?: string;
    } = req.body;

    if (
      !date ||
      !teacher_name ||
      !teacher_id ||
      !student_name ||
      !student_id ||
      !course ||
      !location
    ) {
      return res.status(400).json({ error: 'Empty parameters request' });
    }

    const { db } = await connect();
    const teacherExist = await db.collection('users').findOne({
      _id: new ObjectId(teacher_id),
    });
    if (!teacherExist) {
      return res
        .status(400)
        .json({ error: `Teacher "${teacher_name}" not exists!` });
    }

    const studentExist = await db.collection('users').findOne({
      _id: new ObjectId(student_id),
    });
    if (!studentExist) {
      return res
        .status(400)
        .json({ error: `Student "${student_name}" not exists!` });
    }

    const modelAppointment = {
      date,
      teacher_name,
      teacher_id,
      student_name,
      student_id,
      course,
      location,
      appointment_link: appointment_link || '',
    };

    await db.collection('users').updateOne(
      { _id: new ObjectId(teacher_id) },
      {
        $push: { appointments: modelAppointment },
        $inc: { coins: 1 },
      }
    );

    await db.collection('users').updateOne(
      { _id: new ObjectId(student_id) },
      {
        $push: { appointments: modelAppointment },
        $inc: { coins: -1 },
      }
    );

    return res.status(200).json(modelAppointment);
  } else {
    res.status(400).json({ error: 'Bad reqest' });
  }
}
