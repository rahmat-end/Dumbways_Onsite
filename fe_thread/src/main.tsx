import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { extendTheme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './store/rootReducer.ts'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'darkBg'
      }
    }
  },
  colors: {
    darkBg: "#222"
  }
})

const queryClient = new QueryClient()
const store = configureStore({
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
