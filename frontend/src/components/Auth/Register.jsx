import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://countrybasedcurrency.onrender.com/api/auth/register', {
        name,
        email,
        password,
      });
      navigate('/login');
      toast({
        title: 'Registration successful.',
        description: 'You can now log in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Register error', error);
      toast({
        title: 'Error occurred.',
        description: 'Could not register.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box mt="100px" mx="auto" width={["90%", "70%", "50%", "40%"]} boxShadow="lg" p={8} borderRadius="md" bg="white">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Button type="submit" colorScheme="teal">
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
