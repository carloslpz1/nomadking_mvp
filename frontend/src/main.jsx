import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './contexts/ThemeProvider.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import DocumentTitleProvider from './contexts/DocumentTitleProvider.jsx'
import ToastProvider from './contexts/ToastProvider.jsx'
import ScrollProvider from './contexts/ScrollProvider.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DocumentTitleProvider>
            <ToastProvider>
              <ScrollProvider>
                <App />
              </ScrollProvider>
            </ToastProvider>
          </DocumentTitleProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
