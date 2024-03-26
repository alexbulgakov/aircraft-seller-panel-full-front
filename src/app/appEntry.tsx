import React from 'react'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import theme from './theme.ts'

import { store } from '@/app/appStore'
import { AircraftSellerPage } from '@/pages/aircraftList'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <AircraftSellerPage />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
