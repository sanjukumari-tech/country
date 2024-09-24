// import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, HStack, Link, Button, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} width="100%">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box fontSize="2xl" fontWeight="bold">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              Country
            </Link>
          </Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              Home
            </Link>
            {user && (
              <Link as={RouterLink} to="/favorites" _hover={{ textDecoration: 'none' }}>
                Favorites
              </Link>
            )}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {user ? (
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                as={RouterLink}
                to="/login"
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}>
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                variant={'outline'}
                colorScheme={'teal'}
                size={'sm'}>
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
