import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app'; // 导入 AppProps 类型
import '../styles.scss';

function MyApp({ Component, pageProps }: AppProps) { // 应用类型
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
