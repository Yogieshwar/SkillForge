import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Authprovider } from './context/AuthContext.jsx'
import { RoadmapProvider } from './context/RoadmapContext.jsx'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <RoadmapProvider>
    <Authprovider>
      <App />
    </Authprovider>
    </RoadmapProvider>
    </HashRouter>
  </StrictMode>,
)
