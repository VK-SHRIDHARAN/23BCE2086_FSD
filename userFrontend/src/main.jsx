import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/storeContext.jsx'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </StoreContextProvider>
)
