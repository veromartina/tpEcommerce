import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';  
import Routing from './routes/Routing';  
function App() {
  return (
    <ChakraProvider>
      <Routing /> {/* Aquí se renderiza el componente de rutas */}
    </ChakraProvider>
  );
}

export default App;