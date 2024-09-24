import HomePage from './components/Pages/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import FavoritesPage from './components/Pages/FavoritesPage';

function App() {


  return (
    <>
   <Box minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1" width="100%">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
       
    </>
  )
}

export default App
