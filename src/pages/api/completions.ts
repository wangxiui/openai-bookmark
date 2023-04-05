import { NextApiRequest, NextApiResponse } from 'next';
import fetch from "@/utils/fetch";

const model = process.env.OPENAI_API_MODEL_COMPLETIONS || "text-davinci-003" // model不一致也会报错

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const response = await fetch.post('/v1/completions',{
          prompt,
          model,
          max_tokens: 2048,
          n: 1,
          stop: null,
          temperature: 0.5,
        });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error in completions:', error); // 添加此行来打印错误
      res.status(500).json({ message: 'An error occurred while processing the request' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
