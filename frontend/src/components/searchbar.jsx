import React, { useState } from "react";
import { Box, Input, Button, Stack, useBreakpointValue, useToast } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to the search results page
      navigate(`/search?query=${searchQuery}`);
    } else {
      toast({
        title: "Please enter a search query.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={8} p={4}>
      <Stack direction={{ base: "column", md: "row" }} spacing={4} align="center">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products or content..."
          size="lg"
          borderColor="teal.500"
          focusBorderColor="teal.300"
          bg="white"
          borderRadius="md"
        />
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleSearch}
          leftIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchBar;
