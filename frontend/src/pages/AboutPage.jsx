import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  UnorderedList,
  Divider,
  VStack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const AboutPage = () => {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("gray.100", "gray.700");
  const accentColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Box px={8} py={16} maxW="1200px" mx="auto" bg={bgColor}>
      <VStack spacing={12} align="center">
        {/* Header Section */}
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          bgGradient="linear(to-r, teal.400, teal.600)"
          bgClip="text"
        >
          Apie Mus
        </Heading>

        <Text fontSize="xl" textAlign="center" color={textColor} maxW="800px">
          Esame <strong>A2 komanda</strong> iš Vilniaus technologijų mokymo centro. Mūsų tikslas – sukurti modernią ir patogią aplikaciją kavos entuziastams.
        </Text>

        {/* Goal Section */}
        <Box
          bg={cardBgColor}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          width="100%"
        >
          <Heading as="h3" size="lg" mb={6} color={accentColor}>
            Tikslas
          </Heading>
          <Text fontSize="md" lineHeight="1.8" color={textColor}>
            Sukurti WEB aplikaciją, kurią pasitelkę miesto gyventojai ir svečiai galėtų rasti informaciją apie kavą, ją užsisakyti ir įvertinti. Aplikacija turi būti padalinta į dvi sritis:
            <br />
            <strong>Administracinę</strong> ir <strong>Viešąją</strong>.
          </Text>
        </Box>

        {/* Functional Requirements */}
        <Box textAlign="center" width="100%">
          <Heading as="h3" size="lg" mb={4} color={accentColor}>
            Funkciniai reikalavimai, kurie buvo įgyvendinti:
          </Heading>
          <UnorderedList
            spacing={4}
            textAlign="left"
            display="inline-block"
            maxW="700px"
            mx="auto"
          >
            {[
              "Administracinės srities funkcijos prieinamos tik autentifikuotam vartotojui.",
              "Jeigu vartotojas nėra autentifikuotas, pradiniame puslapyje rodomas prisijungimas.",
              "Autentifikuotas vartotojas (Administratorius) gali įvesti kavos pozicijas: nuorodą, pavadinimą, aprašą, kainą, nuotrauką.",
              "Autentifikuotas vartotojas (Vartotojas) gali užsakyti kavą ir ją įvertinti.",
              "Kavos įvertinimas išsaugomas duomenų bazėje.",
              "Kavos kortelės dešinėje, virš žvaigždutės, rodomas bendras reitingas (paspaudimų skaičius).",
            ].map((item, index) => (
              <ListItem key={index} fontSize="md" color={textColor}>
                <Icon as={FaCheckCircle} color={accentColor} mr={2} />
                {item}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Divider my={6} width="80%" borderColor={textColor} />

        {/* README Section */}
        <Box
          bg={cardBgColor}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="left"
          width="100%"
        >
          <Heading as="h3" size="lg" mb={6} color={accentColor}>
            Projekto paleidimo instrukcijos
          </Heading>

          <Text fontSize="md" color={textColor} lineHeight="1.8" mb={4}>
            Žemiau pateiktos instrukcijos padės paleisti šį projektą lokaliai.
          </Text>

          {/* Backend Instructions */}
          <Box mb={6}>
            <Heading as="h4" size="md" mb={4} color={accentColor}>
              Backend Dependencies:
            </Heading>
            <Box
              bg="gray.900"
              p={4}
              borderRadius="md"
              color="white"
              fontSize="sm"
              fontFamily="monospace"
              overflowX="auto"
            >
              npm install express cors bcrypt mongoose jsonwebtoken cookie-parser nodemon dotenv express-validator passport passport-jwt
            </Box>
            <Heading as="h4" size="md" mt={4} mb={4} color={accentColor}>
              Backend Start:
            </Heading>
            <Box
              bg="gray.900"
              p={4}
              borderRadius="md"
              color="white"
              fontSize="sm"
              fontFamily="monospace"
            >
              npm start
            </Box>
          </Box>

          <Divider my={4} borderColor={textColor} />

          {/* Frontend Instructions */}
          <Box>
            <Heading as="h4" size="md" mb={4} color={accentColor}>
              Frontend Dependencies:
            </Heading>
            <Box
              bg="gray.900"
              p={4}
              borderRadius="md"
              color="white"
              fontSize="sm"
              fontFamily="monospace"
              overflowX="auto"
            >
              npm install zustand @chakra-ui/react @emotion/react @emotion/styled framer-motion axios @chakra-ui/icons react-icons react-router-dom react-dom react-hook-form
            </Box>
            <Heading as="h4" size="md" mt={4} mb={4} color={accentColor}>
              Frontend Start:
            </Heading>
            <Box
              bg="gray.900"
              p={4}
              borderRadius="md"
              color="white"
              fontSize="sm"
              fontFamily="monospace"
            >
              npm run dev
            </Box>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default AboutPage;
