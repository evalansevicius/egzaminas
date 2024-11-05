import { Box, Heading, Text, List, ListItem, UnorderedList, Divider, VStack } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Box px={8} py={16} maxW="1200px" mx="auto">
      <VStack spacing={8} align="center"> {/* Centering all content */}
        {/* Page Title */}
        <Heading as="h1" size="2xl" textAlign="center">
          Apie Mus
        </Heading>

        {/* Introduction Text */}
        <Text fontSize="lg" textAlign="center">
          Esame A2 komanda iš Vilniaus technologijų mokymo centro.
        </Text>

        {/* Project Goal */}
        <Box bg="gray.100" p={6} borderRadius="md" boxShadow="md" textAlign="center">
          <Heading as="h3" size="lg" mb={4}>
            Tikslas:
          </Heading>
          <Text fontSize="md">
            Sukurti WEB aplikaciją, kurią pasitelkę miesto gyventojai ir svečiai galėtų rasti informaciją apie kavą, ja užsisakyti ir įvertinti.
            Aplikacija turi būti su administracinės dalies ir viešosios srities.
          </Text>
        </Box>

        {/* Functional Requirements */}
        <Box textAlign="center">
          <Heading as="h3" size="lg" mb={4}>
            Funkciniai reikalavimai, kurie buvo įgyvendinti:
          </Heading>
          <UnorderedList spacing={3} textAlign="center" display="inline-block">
            <ListItem>
              Administracinės srities funkcijos prieinamos tik autenfikuotam vartotojui.
            </ListItem>
            <ListItem>
              Jeigu vartotojas nėra autenfikuotas, pradiniame puslapyje rodomas prisijungimas.
            </ListItem>
            <ListItem>
              Autenfikuotas vartotojas (Administratorius) gali įvesti kavos pozicijas, nuorodą, pavadinimą, aprašą, kainą, nuotrauką.
            </ListItem>
            <ListItem>
              Autenfikuotas vartotojas (Vartotojas) gali užsakyti kavą, ją įvertinti.
            </ListItem>
            <ListItem>
              Kavos įvertinimas išsaugomas duomenų bazėje.
            </ListItem>
            <ListItem>
              Kavos kortelės dešinėje, virš žvaigždutės, yra rodomas bendras reitingas (paspaudimų skaičius).
            </ListItem>
          </UnorderedList>
        </Box>

        <Divider my={6} />

        {/* README Section */}
        <Box bg="gray.100" p={6} borderRadius="md" boxShadow="md" textAlign="center">
          <Heading as="h3" size="lg" mb={4}>
            Čia įkelsime README tekstą kaip pasileisti projektą.
          </Heading>
          <Text fontSize="md">
            (Informacija apie tai, kaip pasileisti projektą, bus įkelta čia, kai bus pasiruošę.)
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default AboutPage;
