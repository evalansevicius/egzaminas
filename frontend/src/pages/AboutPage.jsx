import { Box, Heading, Text, List, ListItem, UnorderedList, Divider, VStack, useColorModeValue } from "@chakra-ui/react";

const AboutPage = () => {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const cardBgColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Box px={8} py={16} maxW="1200px" mx="auto" bg={bgColor}>
      <VStack spacing={12} align="center">
        <Heading as="h1" size="2xl" textAlign="center" color={textColor}>
          Apie Mus
        </Heading>

        <Text fontSize="lg" textAlign="center" color={textColor}>
          Esame A2 komanda iš Vilniaus technologijų mokymo centro.
        </Text>

        <Box bg={cardBgColor} p={6} borderRadius="md" boxShadow="md" textAlign="center" width="100%">
          <Heading as="h3" size="lg" mb={4} color={textColor}>
            Tikslas
          </Heading>
          <Text fontSize="md" color={textColor}>
            Sukurti WEB aplikaciją, kurią pasitelkę miesto gyventojai ir svečiai galėtų rasti informaciją apie kavą, ja užsisakyti ir įvertinti.
            Aplikacija turi būti su administracinės dalies ir viešosios srities.
          </Text>
        </Box>

        <Box textAlign="center" width="100%">
          <Heading as="h3" size="lg" mb={4} color={textColor}>
            Funkciniai reikalavimai, kurie buvo įgyvendinti:
          </Heading>
          <UnorderedList spacing={3} textAlign="left" display="inline-block" maxW="700px" mx="auto">
            <ListItem color={textColor}>
              Administracinės srities funkcijos prieinamos tik autenfikuotam vartotojui.
            </ListItem>
            <ListItem color={textColor}>
              Jeigu vartotojas nėra autenfikuotas, pradiniame puslapyje rodomas prisijungimas.
            </ListItem>
            <ListItem color={textColor}>
              Autenfikuotas vartotojas (Administratorius) gali įvesti kavos pozicijas, nuorodą, pavadinimą, aprašą, kainą, nuotrauką.
            </ListItem>
            <ListItem color={textColor}>
              Autenfikuotas vartotojas (Vartotojas) gali užsakyti kavą, ją įvertinti.
            </ListItem>
            <ListItem color={textColor}>
              Kavos įvertinimas išsaugomas duomenų bazėje.
            </ListItem>
            <ListItem color={textColor}>
              Kavos kortelės dešinėje, virš žvaigždutės, yra rodomas bendras reitingas (paspaudimų skaičius).
            </ListItem>
          </UnorderedList>
        </Box>

        <Divider my={6} width="80%" borderColor={textColor} />

        <Box bg={cardBgColor} p={6} borderRadius="md" boxShadow="md" textAlign="left" width="100%">
          <Heading as="h3" size="lg" mb={4} color={textColor}>
            Čia įkelsime README tekstą kaip pasileisti projektą
          </Heading>

          <Text fontSize="md" color={textColor} lineHeight="1.8" whiteSpace="pre-line">
            <strong>Kaip pasileisti projektą</strong>
          </Text>

          <Box mt={4}>
            <Text fontSize="md" color={textColor} mt={2}>
              <strong>Backend Dependencies:</strong>
            </Text>
            <Box bg="gray.700" p={4} borderRadius="md" color="white" my={2}>
              <pre>
                npm install express cors bcrypt mongoose jsonwebtoken cookie-parser nodemon dotenv express-validator passport passport-jwt
              </pre>
            </Box>
            <Text fontSize="md" color={textColor} mt={2}>
              <strong>Backend Start:</strong>
            </Text>
            <Box bg="gray.700" p={4} borderRadius="md" color="white" my={2}>
              <pre>npm start</pre>
            </Box>
            <Text fontSize="md" color={textColor} mt={2} fontStyle="italic">
              <strong>PRIVALOMA BUTI BACKEND FOLDERI</strong>
            </Text>
          </Box>

          <Divider my={4} borderColor={textColor} />

          <Box mt={4}>
            <Text fontSize="md" color={textColor} mt={2}>
              <strong>Frontend Dependencies:</strong>
            </Text>
            <Box bg="gray.700" p={4} borderRadius="md" color="white" my={2} overflowX="auto">
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                npm install zustand @chakra-ui/react @emotion/react @emotion/styled framer-motion axios @chakra-ui/icons react-icons react-router-dom react-dom react-hook-form
              </pre>
            </Box>
            <Text fontSize="md" color={textColor} mt={2}>
              <strong>Frontend Start:</strong>
            </Text>
            <Box bg="gray.700" p={4} borderRadius="md" color="white" my={2}>
              <pre>npm run dev</pre>
            </Box>
            <Text fontSize="md" color={textColor} mt={2} fontStyle="italic">
              <strong>PRIVALOMA BUTI FRONTEND FOLDERI</strong>
            </Text>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default AboutPage;
