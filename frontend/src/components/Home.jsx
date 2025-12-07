import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  SimpleGrid,
  useColorModeValue,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Wrap Chakra components with motion for animations
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const Home = () => {
  // Theme colors
  const bg = 'gray.900';
  const color = 'white';
  const accentColor = 'blue.400';
  const cardBg = 'gray.800';

  return (
    <Box bg={bg} minH="100vh" color={color} overflowX="hidden">
      {/* Navbar */}
      <Box as="nav" w="full" py={4} px={8} position="sticky" top={0} zIndex={100} bg="rgba(23, 25, 35, 0.9)" backdropFilter="blur(10px)">
        <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
          <Heading size="md" fontWeight="bold" letterSpacing="wider">
            CRACK<Text as="span" color={accentColor}>DETECTIVE</Text>
          </Heading>
          <HStack spacing={4}>
            <Button as={RouterLink} to="/signin" variant="ghost" colorScheme="blue" size="sm">
              Sign In
            </Button>
            <Button as={RouterLink} to="/signup" bg={accentColor} color="white" _hover={{ bg: 'blue.500' }} size="sm">
              Sign Up
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Hero Section */}
      <Container maxW="container.xl" pt={16} pb={20}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align="center">
          <Box flex={1}>
            <MotionHeading
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="extrabold"
              lineHeight="1.2"
            >
              Advanced Vehicle <br />
              <Text as="span" color={accentColor}>Damage Detection</Text>
            </MotionHeading>
            <Text mt={6} fontSize="xl" color="gray.400" maxW="lg">
              Leverage the power of AI to instantly identify cracks, dents, and measure component dimensions with high precision.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mt={8}>
              <Button
                as={RouterLink}
                to="/signup"
                size="lg"
                bg={accentColor}
                color="white"
                _hover={{ bg: 'blue.500' }}
                px={8}
              >
                Get Started
              </Button>
              <Button
                as="a"
                href="#features"
                size="lg"
                variant="outline"
                colorScheme="blue"
                px={8}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
          <Box flex={1} w="full">
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              position="relative"
              height="400px"
              rounded="2xl"
              overflow="hidden"
              boxShadow="2xl"
              bg="gray.700"
            >
              {/* Image Placeholder */}
              <Image
                src="https://inspektlabs.com/blog/content/images/2022/11/13-1.jpg" // Keeping the original image as it looks relevant
                alt="AI Analysis"
                objectFit="cover"
                w="full"
                h="full"
                opacity={0.8}
              />
              <Box position="absolute" inset={0} bgGradient="linear(to-t, gray.900, transparent)" />
            </MotionBox>
          </Box>
        </Stack>
      </Container>

      {/* Features Section */}
      <Box id="features" py={20} bg="gray.800">
        <Container maxW="container.xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading size="2xl">Core Capabilities</Heading>
            <Text fontSize="lg" color="gray.400" maxW="2xl">
              Our computer-vision based solutions provide comprehensive analysis for automotive and manufacturing inspections.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <FeatureCard
              title="Crack & Dent Detection"
              description="Upload images of vehicles or subsystems to automatically detect and classify surface damages. Our ML models are trained to spot even the smallest imperfections."
              imgSrc="https://inspektlabs.com/blog/content/images/2022/11/13-1.jpg" // Reusing or placeholder
            />
            <FeatureCard
              title="Dimension Measurement"
              description="Precise geometric analysis of components. Measure dimensions of shapes like squares, triangles, and polygons using advanced image processing."
              // To use your local image, change the src below to: require('../Screenshot (65).png')
              imgSrc="https://placehold.co/600x400/1A202C/FFFFFF?text=Dimension+Measurement" 
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={10} borderTop="1px" borderColor="gray.700">
        <Container maxW="container.xl">
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
            <Text color="gray.500">© 2025 Crack Detective. All rights reserved.</Text>
            <HStack spacing={6} mt={{ base: 4, md: 0 }}>
              <LinkItem to="#">Privacy Policy</LinkItem>
              <LinkItem to="#">Terms of Service</LinkItem>
              <LinkItem to="#">Contact</LinkItem>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

const FeatureCard = ({ title, description, imgSrc }) => {
  return (
    <Box
      bg="gray.900"
      rounded="xl"
      overflow="hidden"
      boxShadow="lg"
      transition="transform 0.3s"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      <Box h="250px" overflow="hidden">
        <Image src={imgSrc} alt={title} objectFit="cover" w="full" h="full" />
      </Box>
      <Box p={8}>
        <Heading size="lg" mb={4}>{title}</Heading>
        <Text color="gray.400" fontSize="md" lineHeight="tall">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

const LinkItem = ({ to, children }) => (
  <Text as="a" href={to} color="gray.500" _hover={{ color: 'blue.400' }} cursor="pointer">
    {children}
  </Text>
);

export default Home;
