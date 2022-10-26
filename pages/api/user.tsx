/* eslint-disable prettier/prettier */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from "../../utils/database";

interface ErrorResponseType {
  error: string;
};
interface SuccessRepsonseType {
  _id: number;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessRepsonseType>
): Promise<void> {
  
  if(req.method === 'POST') {
    const {name, email, cellphone, teacher} = req.body;
    
    if(!name || !email || !cellphone || teacher === undefined){
      return res.status(400).json({error: "Empty parameters request"});
    }
    
    const {db} = await connect();
    const responses = await db.collection('users').insertOne({
      name, email, cellphone, teacher
    });
    const result = await db.collection('users').findOne(responses.insertedId)
    return res.status(200).json(result);

  }else{

    res.status(400).json({error: "Bad request"});

  }

}