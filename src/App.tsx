import AILandingPage from './lending'
import { AuthProvider, LoginModal } from './components/Login'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <AILandingPage />
      <LoginModal />
    </AuthProvider>
  )
}

export default App
