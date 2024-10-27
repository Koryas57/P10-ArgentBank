import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Mettre le Provider dans le point d'entrée */}
    <App />
    </Provider>
  </StrictMode>,
)
