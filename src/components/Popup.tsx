import {Button, Input, VStack} from '@chakra-ui/react';
import { useRef } from 'react';
import { parseInstruction } from '@/hooks/useOpenai';

const Popup = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = async () => {
    const inputText = inputRef.current?.value;
    if (inputText) {
      const instruction = await parseInstruction(inputText);
      console.log('instruction', instruction);
      // 在这里根据解析的指令执行相应的书签操作≈
    }
  };

  return (
    <VStack
      spacing={4} p={4} className="bg-white rounded shadow-lg" // 使用 Tailwind CSS 类名
    >
      <Input placeholder="Enter your instruction" ref={inputRef} />
      <Button onClick={handleButtonClick} className="bg-blue-500 text-white">
        Organize Bookmarks
      </Button>
    </VStack>
  );

};

export default Popup;
