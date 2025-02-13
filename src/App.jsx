import React from 'react';
import { ChakraProvider, Heading } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider >
           <Heading >Hola</Heading>
    </ChakraProvider>
  );
}

export default App;