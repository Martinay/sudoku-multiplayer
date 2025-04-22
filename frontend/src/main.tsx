import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createClient,
  fetchExchange,
  Provider as UrqlProvider
} from 'urql'
import { Provider } from './components/ui/provider.tsx'

const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [
    fetchExchange 
  ],
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UrqlProvider value={client}>
      <Provider>
        <App />
      </Provider>
    </UrqlProvider>
  </StrictMode>,
)
