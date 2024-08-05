import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './contexts/ThemeProvider.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import ChatProvider from './contexts/ChatProvider.jsx'
import DocumentTitleProvider from './contexts/DocumentTitleProvider.jsx'
import ToastProvider from './contexts/ToastProvider.jsx'
import ScrollProvider from './contexts/ScrollProvider.jsx'
import SocketProvider from './contexts/SocketProvider.jsx'
import App from './App.jsx'
import './index.css'
import NavbarProvider from './contexts/NavbarProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ChatProvider>
            <DocumentTitleProvider>
              <ToastProvider>
                <ScrollProvider>
                  <NavbarProvider>
                    <SocketProvider>
                      <App />
                    </SocketProvider>
                  </NavbarProvider>
                </ScrollProvider>
              </ToastProvider>
            </DocumentTitleProvider>
          </ChatProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
