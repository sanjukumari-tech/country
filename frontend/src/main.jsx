import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  <ChakraProvider>
  <AuthProvider>

    <App />
    
  </AuthProvider>
  </ChakraProvider>
    </BrowserRouter>
 
)
