import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './components/Commons/Header/index.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <Header />
    <App />
  </>,
)
