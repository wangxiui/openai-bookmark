import axios from 'axios';

const parseInstruction = async (text: string) => {
  try {
    // 请帮我创建一个111的文件夹
    // const response = await axios.post('/api/completions', { // 自动补全模型
    const response = await axios.post('/api/chat', { // 对话模型
      prompt: `Parse the following instruction for a bookmark manager: "${text}"`,
    });

    // 提取 choices 属性
    const choice = response.data.choices[0].text.trim();
    return JSON.parse(choice);
  } catch (error) {
    console.error("Error parsing instruction:", error);
    return null;
  }
};

export {
  parseInstruction
}
