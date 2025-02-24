import { Box, Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <VStack display="flex" justifyContent="center" alignItems="center" w="100%" height="60%">
    <Box >
        <Text>
       No existe la ruta error 404
       </Text>
       </Box>

       <Box>
       <Button colorScheme='teal' color="black" onClick={()=>navigate(-1)}>Atrás</Button>
      
       </Box>
       </VStack>
  )
}

export default NotFound