import React, { useState, useEffect, useContext } from 'react';
import { Box, Input, SimpleGrid, VStack, Flex, useToast } from '@chakra-ui/react';
import axios from 'axios';
import CountryCard from '../Country/CountryCard';
import { AuthContext } from '../../context/AuthContext';

const HomePage = () => {
  const [currency, setCurrency] = useState('');
  const [countries, setCountries] = useState([]);
  const toast = useToast();
  const { user, getAuthHeaders } = useContext(AuthContext);

  const fetchAllCountries = async () => {
    try {
      const { data } = await axios.get('https://countrybasedcurrency.onrender.com/api/countries');
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries', error);
      toast({
        title: 'Error occurred.',
        description: 'Could not fetch countries.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`https://countrybasedcurrency.onrender.com/api/countries/${currency}`);
      setCountries(data);
      toast({
        title: 'Search completed.',
        description: `Found countries with currency code: ${currency}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Search error', error);
      toast({
        title: 'Error occurred.',
        description: 'Could not fetch countries.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return (
    <Flex direction="column" align="center" p={4} flex="1">
      <VStack spacing={4} width="full" maxWidth="800px">
        <Input
          placeholder="Enter currency code"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={4} width="full">
          {countries.map((country) => (
            <CountryCard key={country.name} country={country} onFavorite={() => fetchAllCountries()} />
          ))}
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default HomePage;
