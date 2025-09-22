import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/Router.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from './contexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';

// create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
