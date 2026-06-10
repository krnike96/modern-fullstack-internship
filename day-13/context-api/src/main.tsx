import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { CounterProvider } from './context/counter.tsx'
import { CartProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <CounterProvider> */}
    <CartProvider>
      <App />
    </CartProvider>
    {/* </CounterProvider> */}
  </StrictMode>,
)
