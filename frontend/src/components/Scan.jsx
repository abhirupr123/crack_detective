import React, { useState, useRef, useCallback } from 'react';
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
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  useColorModeValue,
  Image,
  FormControl,
  FormLabel,
  Stack,
  Center,
} from '@chakra-ui/react';
import { FiUpload, FiCamera, FiLogOut, FiMaximize, FiActivity } from 'react-icons/fi';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useFirebase } from '../Firebase';
import { Link as RouterLink } from 'react-router-dom';

const Scan = () => {
  const firebase = useFirebase();
  const toast = useToast();
  const webRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);

  // Theme colors matching Home.jsx
  const bg = 'gray.900';
  const color = 'white';
  const accentColor = 'blue.400';
  const cardBg = 'gray.800';
  const borderColor = 'gray.700';

  const live = async () => {
    try {
      await axios.get('http://127.0.0.1:5000/live');
    } catch (error) {
      console.error("Error starting live feed:", error);
      toast({
        title: 'Error',
        description: "Could not start live feed. Make sure the backend is running.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webRef]);

  const retake = () => {
    setCapturedImage(null);
  };

  const signout = async () => {
    await firebase.signout();
    toast({
      title: 'Sign Out Successful',
      description: "You have been signed out of your account",
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
        </Flex>
      </Box>

      <Container maxW="container.lg" py={10}>
        <Tabs isFitted variant="enclosed-colored" colorScheme="blue">
          <TabList mb="1em" borderBottomColor={borderColor}>
            <Tab _selected={{ color: 'white', bg: accentColor, borderColor: accentColor }} color="gray.400">
              <HStack spacing={2}>
                <Icon as={FiActivity} />
                <Text>Crack & Dent Detection</Text>
              </HStack>
            </Tab>
            <Tab _selected={{ color: 'white', bg: accentColor, borderColor: accentColor }} color="gray.400">
              <HStack spacing={2}>
                <Icon as={FiMaximize} />
                <Text>Dimension Measurement</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* Crack Detection Panel */}
            <TabPanel p={0}>
              <Stack spacing={8}>
                <Box textAlign="center" py={8}>
                  <Heading size="lg" mb={4}>Vehicle Damage Analysis</Heading>
                  <Text color="gray.400" fontSize="lg">
                    Upload an image or use your camera to detect cracks, dents, and other defects.
                  </Text>
                </Box>

                <Flex direction={{ base: 'column', md: 'row' }} gap={8} justify="center">
                  {/* Webcam Section */}
                  <Card title="Live Capture" icon={FiCamera}>
                    <VStack spacing={6} w="full">
                      {!isWebcamOpen ? (
                        <Button
                          onClick={() => setIsWebcamOpen(true)}
                          h="200px"
                          w="full"
                          border="2px dashed"
                          borderColor="gray.600"
                          bg="gray.800"
                          _hover={{ bg: 'gray.700', borderColor: accentColor }}
                          flexDir="column"
                          gap={4}
                        >
                          <Icon as={FiCamera} w={10} h={10} color="gray.400" />
                          <Text color="gray.400">Open Camera</Text>
                        </Button>
                      ) : (
                        <VStack w="full" spacing={4}>
                          {capturedImage ? (
                            <Image src={capturedImage} alt="Captured" borderRadius="md" w="full" />
                          ) : (
                            <Box borderRadius="md" overflow="hidden" w="full">
                              <Webcam
                                audio={false}
                                ref={webRef}
                                screenshotFormat="image/jpeg"
                                width="100%"
                                videoConstraints={{ facingMode: "user" }}
                              />
                            </Box>
                          )}
                          <HStack>
                            {capturedImage ? (
                              <Button onClick={retake} variant="outline" colorScheme="blue">
                                Retake
                              </Button>
                            ) : (
                              <Button onClick={capture} colorScheme="blue">
                                Capture
                              </Button>
                            )}
                            <Button onClick={() => { setIsWebcamOpen(false); setCapturedImage(null); }} variant="ghost">
                              Close
                            </Button>
                          </HStack>
                        </VStack>
                      )}
                    </VStack>
                  </Card>

                  {/* Upload Section */}
                  <Card title="Upload Image" icon={FiUpload}>
                    <form encType='multipart/form-data' method='post' action='http://127.0.0.1:5000/crack' style={{ width: '100%' }}>
                      <VStack spacing={6} w="full" h="full" justify="center">
                         <FormControl>
                            <Center
                              w="full"
                              h="200px"
                              border="2px dashed"
                              borderColor="gray.600"
                              borderRadius="md"
                              bg="gray.800"
                              _hover={{ bg: 'gray.700', borderColor: accentColor }}
                              position="relative"
                            >
                                <VStack spacing={2}>
                                    <Icon as={FiUpload} w={10} h={10} color="gray.400" />
                                    <Text color="gray.400">Click to select image</Text>
                                </VStack>
                                <Input
                                    type="file"
                                    name="image"
                                    height="100%"
                                    width="100%"
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    opacity="0"
                                    aria-hidden="true"
                                    accept="image/*"
                                    cursor="pointer"
                                />
                            </Center>
                         </FormControl>
                        <Button type="submit" colorScheme="blue" w="full" size="lg">
                          Analyze Image
                        </Button>
                      </VStack>
                    </form>
                  </Card>
                </Flex>
              </Stack>
            </TabPanel>

            {/* Dimension Measurement Panel */}
            <TabPanel p={0}>
              <Stack spacing={8}>
                <Box textAlign="center" py={8}>
                  <Heading size="lg" mb={4}>Object Dimension Measurement</Heading>
                  <Text color="gray.400" fontSize="lg">
                    Measure dimensions of geometric objects in real-time or from an image.
                  </Text>
                </Box>

                <Flex direction={{ base: 'column', md: 'row' }} gap={8} justify="center">
                  {/* Live Feed Section */}
                  <Card title="Real-time Measurement" icon={FiActivity}>
                    <VStack spacing={6} w="full" h="full" justify="center" py={8}>
                       <Text color="gray.400" textAlign="center">
                         Launch the live video feed processing window on the server.
                       </Text>
                       <Button
                          onClick={live}
                          size="lg"
                          colorScheme="green"
                          leftIcon={<Icon as={FiActivity} />}
                        >
                          Start Live Feed
                        </Button>
                    </VStack>
                  </Card>

                   {/* Upload Section */}
                   <Card title="Upload Image" icon={FiUpload}>
                    <form encType='multipart/form-data' method='post' action='http://127.0.0.1:5000/object' style={{ width: '100%' }}>
                      <VStack spacing={6} w="full" h="full" justify="center">
                         <FormControl>
                            <Center
                              w="full"
                              h="200px"
                              border="2px dashed"
                              borderColor="gray.600"
                              borderRadius="md"
                              bg="gray.800"
                              _hover={{ bg: 'gray.700', borderColor: accentColor }}
                              position="relative"
                            >
                                <VStack spacing={2}>
                                    <Icon as={FiUpload} w={10} h={10} color="gray.400" />
                                    <Text color="gray.400">Click to select image</Text>
                                </VStack>
                                <Input
                                    type="file"
                                    name="image"
                                    height="100%"
                                    width="100%"
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    opacity="0"
                                    aria-hidden="true"
                                    accept="image/*"
                                    cursor="pointer"
                                />
                            </Center>
                         </FormControl>
                        <Button type="submit" colorScheme="blue" w="full" size="lg">
                          Measure Dimensions
                        </Button>
                      </VStack>
                    </form>
                  </Card>
                </Flex>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

const Card = ({ title, icon, children }) => (
  <Box
    bg="gray.800"
    p={6}
    rounded="xl"
    shadow="lg"
    border="1px"
    borderColor="gray.700"
    flex={1}
    w="full"
  >
    <HStack mb={6} spacing={3} color="blue.400">
      <Icon as={icon} w={6} h={6} />
      <Heading size="md" color="white">{title}</Heading>
    </HStack>
    {children}
  </Box>
);

export default Scan;
