import axios from "axios";

const fetch = axios.create({
  baseURL: 'https://vw50.eu.org',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 请将 YOUR_API_KEY 替换为您的实际 OpenAI API 密钥
  },
  timeout: 10000, // 设置请求超时时间为 10 秒
});

export default fetch;
