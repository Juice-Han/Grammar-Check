import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import DefaultLayout from './Layouts/DefaultLayout'
import GrammarCheckPage from './pages/GrammarCheckPage'
import WrongSummaryPage from './pages/WrongSummaryPage'
import LoginPage from './pages/LoginPage'
import SignOnPage from './pages/SignOnPage'
import AuthCallbackPage from './pages/AuthCallbackPage'

function App() {
  return (
    <>
      <Routes>
        {/* 인증 불필요 라우트 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignOnPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* 인증 필요 라우트 (DefaultLayout 사용) */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<GrammarCheckPage />} />
          <Route path="/grammar-check" element={<GrammarCheckPage />} />
          <Route path="/wrong-summary" element={<WrongSummaryPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
