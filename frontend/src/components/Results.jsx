import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  useToast,
  Image,
  Spinner,
  Icon
} from '@chakra-ui/react';
import { FiLogOut, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import { useFirebase } from '../Firebase';
import { Link as RouterLink } from 'react-router-dom';

const Results = () => {
  const firebase = useFirebase();
  const toast = useToast();
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Theme colors
  const bg = 'gray.900';
  const color = 'white';
  const accentColor = 'blue.400';
  const borderColor = 'gray.700';

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get('http://127.0.0.1:5000/crack');
      console.log(result);
      const data = result.data;
      if (data && data.Image) {
        setResultImage(`data:image/png;base64, ${data.Image}`);
        toast({
          title: 'Analysis Complete',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'No Results Found',
          description: "Could not retrieve the processed image.",
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      toast({
        title: 'Error',
        description: "Failed to fetch results from the server.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signout = async () => {
    await firebase.signout();
    toast({
      title: 'Sign Out Successful',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
    window.location.href = '/';
  };

  return (
    <Box bg={bg} minH="100vh" color={color}>
       {/* Navbar */}
      <Box as="nav" w="full" py={4} px={8} borderBottom="1px" borderColor={borderColor} bg="gray.900">
        <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
          <Heading size="md" fontWeight="bold" letterSpacing="wider">
            CRACK<Text as="span" color={accentColor}>DETECTIVE</Text>
          </Heading>
           <HStack spacing={4}>
               <Button as={RouterLink} to="/home" variant="ghost" colorScheme="blue" leftIcon={<FiArrowLeft />}>
                   Back to Scan
               </Button>
               <Button
                onClick={signout}
                leftIcon={<FiLogOut />}
                variant="ghost"
                colorScheme="red"
                size="sm"
                _hover={{ bg: 'red.900' }}
              >
                Sign Out
              </Button>
           </HStack>
        </Flex>
      </Box>

      <Container maxW="container.lg" py={12}>
        <VStack spacing={8}>
            <Box textAlign="center">
                <Heading size="xl" mb={4}>Analysis Results</Heading>
                <Text color="gray.400">View the detected cracks and anomalies below.</Text>
            </Box>

            <Box
                w="full"
                minH="400px"
                bg="gray.800"
                rounded="xl"
                border="1px"
                borderColor={borderColor}
                p={8}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                position="relative"
            >
                {isLoading ? (
                    <VStack>
                        <Spinner size="xl" color={accentColor} thickness="4px" />
                        <Text mt={4} color="gray.400">Processing image...</Text>
                    </VStack>
                ) : resultImage ? (
                    <VStack spacing={6} w="full">
                        <Image src={resultImage} alt="Analysis Result" maxH="600px" objectFit="contain" rounded="lg" shadow="2xl" />
                        <Button
                            leftIcon={<Icon as={FiCheckCircle} />}
                            colorScheme="green"
                            size="lg"
                            onClick={() => window.location.href = '/home'}
                        >
                            Done
                        </Button>
                    </VStack>
                ) : (
                    <VStack spacing={6}>
                        <Text fontSize="lg" color="gray.400">Results are ready for viewing.</Text>
                        <Button onClick={fetchResults} colorScheme="blue" size="lg">
                            Show Results
                        </Button>
                    </VStack>
                )}
            </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Results;
