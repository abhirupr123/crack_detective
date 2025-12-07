import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
  Flex,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFirebase } from '../Firebase';
import { Link as RouterLink } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const firebase = useFirebase();
  const toast = useToast();

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await firebase.signin(email, password);
      toast({
        title: 'Sign In Successful',
        description: "Welcome back!",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      window.location.href = '/home';
    } catch (error) {
      toast({
        title: 'Sign In Failed',
        description: "Incorrect email or password.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const bg = 'gray.900';
  const color = 'white';
  const cardBg = 'gray.800';
  const accentColor = 'blue.400';

  return (
    <Box bg={bg} minH="100vh" color={color}>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6" textAlign="center">
            <Heading size={{ base: 'xl', md: '2xl' }} fontWeight="bold">
              Sign in to <br />
              CRACK<Text as="span" color={accentColor}>DETECTIVE</Text>
            </Heading>
            <Text color="gray.400">
              Don't have an account?{' '}
              <Link as={RouterLink} to="/signup" color={accentColor}>
                Sign up
              </Link>
            </Text>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={cardBg}
            boxShadow={{ base: 'none', sm: 'xl' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
            border="1px"
            borderColor="gray.700"
          >
            <Stack spacing="6" as="form" onSubmit={login}>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email" color="gray.300">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="gray.700"
                    borderColor="gray.600"
                    _hover={{ borderColor: 'gray.500' }}
                    _focus={{ borderColor: accentColor, boxShadow: 'none' }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password" color="gray.300">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="gray.700"
                    borderColor="gray.600"
                    _hover={{ borderColor: 'gray.500' }}
                    _focus={{ borderColor: accentColor, boxShadow: 'none' }}
                  />
                </FormControl>
              </Stack>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Signin;
