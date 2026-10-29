import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider,} from "@tanstack/react-query"
import { CounterProvider} from "./USE_CONTEXT/CounterContext.jsx";
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CounterProvider>
        <App />
      </CounterProvider>
    </QueryClientProvider>
  </StrictMode>
);