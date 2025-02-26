import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const { login } = useAuth();
  const onSubmit = async (data) => {
    try {
      await login(data);

    } catch (error) {
      console.error("Error en el login", error);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <Heading>Inicio de sesion</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Usuario</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Ingrese su usuario"
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              {...register("password", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                icon={show ? <FiEyeOff /> : <FiEye />}
                onClick={handleClick}
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Box display="flex" justifyContent="center">
          {" "}
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            width="50%"
            justifyItems="center"
          >
            Iniciar sesion
          </Button>
        </Box>
      </form>
    </Box>
  );
};
  {/* FALTA MOSTRAR EL NOMBRE DEL CLIENTE MIENTRAS ESTE CON SU SESION INICIADA Y FUNCION PARA GUARDAR ESOS DATOS CUANDO SE LOGEA */}