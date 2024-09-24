import React, { useState, useEffect, useContext } from 'react';
import { SimpleGrid, Flex } from '@chakra-ui/react';
import CountryCard from '../Country/CountryCard';
import { AuthContext } from '../../context/AuthContext';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };

  const handleRemove = (country) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.name !== country.name));
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return (
    <Flex direction="column" align="center" p={4} flex="1">
      <SimpleGrid columns={[1, 2, 3]} spacing={4} width="full">
        {favorites.map((country, index) => (
          <CountryCard 
            key={index} 
            country={country} 
            showFavoriteButton={false} 
            showRemoveButton={true} 
            onRemove={handleRemove} 
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default FavoritesPage;
