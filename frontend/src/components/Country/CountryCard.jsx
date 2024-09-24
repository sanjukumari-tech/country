import React, { useContext } from 'react';
import { Box, Button, Image, Text, useToast, Flex } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';

const CountryCard = ({ country, showFavoriteButton = true, showRemoveButton = false, onFavorite, onRemove }) => {
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const handleFavorite = () => {
    if (!user) return;

    try {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.push(country);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      if (onFavorite) onFavorite(country);

      toast({
        title: 'Added to favorites.',
        description: `${country.name} has been added to your favorites.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding favorite', error);
      toast({
        title: 'Error occurred.',
        description: 'Could not add to favorites.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemove = () => {
    try {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(fav => fav.name !== country.name);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      if (onRemove) onRemove(country);

      toast({
        title: 'Removed from favorites.',
        description: `${country.name} has been removed from your favorites.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error removing favorite', error);
      toast({
        title: 'Error occurred.',
        description: 'Could not remove from favorites.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md">
      <Flex justifyContent="center">
        <Image boxSize="100px" src={country.flag} alt={`${country.name} flag`} mb={4} />
      </Flex>
      <Box textAlign="center">
        <Text fontWeight="bold" fontSize="xl">{country.name}</Text>
        <Text>Capital: {country.capital}</Text>
        <Text>Currency: {country.currency}</Text>
        <Text>Languages: {country.languages}</Text>
        {user && showFavoriteButton && (
          <Button colorScheme="teal" mt="4" onClick={handleFavorite}>
            Add to Favorites
          </Button>
        )}
        {user && showRemoveButton && (
          <Button colorScheme="red" mt="4" onClick={handleRemove}>
            Remove from Favorites
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CountryCard;
