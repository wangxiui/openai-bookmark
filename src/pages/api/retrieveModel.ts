import { NextApiRequest, NextApiResponse } from 'next';
import fetch from "@/utils/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { model } = req.body;

    try {
      const response = await fetch.get(`/v1/models/${model}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error in listModels:', error); // 添加此行来打印错误
      res.status(500).json({ message: 'An error occurred while processing the request' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
