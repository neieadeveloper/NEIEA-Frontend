import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './global.css'
import MaintenancePage from './MaintenancePage.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> 
    {/* <MaintenancePage/> */}
  </React.StrictMode>,
)