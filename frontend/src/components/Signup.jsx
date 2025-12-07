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
  Link,
} from '@chakra-ui/react';
import { useFirebase } from '../Firebase';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const firebase = useFirebase();
  const toast = useToast();

  const sign = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await firebase.signup(email, password);
      const id = res.user.accessToken;
      if (res.user.accessToken != null) {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        
        try {
            await axios.post("http://127.0.0.1:5000/create", { id, name });
        } catch (backendError) {
            console.error("Backend sync failed", backendError);
            // Optional: Show warning but allow login proceed?
        }
        
        window.location.href = '/home';
      }
    } catch (error) {
      toast({
        title: 'Sign Up Failed',
        description: error.message || "This email might already be in use.",
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
              Create an account
            </Heading>
            <Text color="gray.400">
              Already have an account?{' '}
              <Link as={RouterLink} to="/signin" color={accentColor}>
                Sign in
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
            <Stack spacing="6" as="form" onSubmit={sign}>
              <Stack spacing="5">
                <FormControl isRequired>
                  <FormLabel htmlFor="name" color="gray.300">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    bg="gray.700"
                    borderColor="gray.600"
                    _hover={{ borderColor: 'gray.500' }}
                    _focus={{ borderColor: accentColor, boxShadow: 'none' }}
                  />
                </FormControl>
                <FormControl isRequired>
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
                <FormControl isRequired>
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
                Sign up
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Signup;
