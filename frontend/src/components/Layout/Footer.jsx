import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.600', 'gray.200')}
      py={4}
      mt={8}>
      <Text align="center">
        &copy; {new Date().getFullYear()} CountryInfo. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
