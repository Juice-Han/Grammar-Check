import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import NotFound from './pages/NotFound'
import DefaultLayout from './Layouts/DefaultLayout'
import GrammarCheckPage from './pages/GrammarCheckPage'
import WrongSummaryPage from './pages/WrongSummaryPage'
import LoginPage from './pages/LoginPage'
import SignOnPage from './pages/SignOnPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { supabase } from './lib/supabase'
import { useAuthStore } from './store/authStore'

function App() {
  const { setAuth, setLoading } = useAuthStore()

  useEffect(() => {
    // 초기 세션 확인 - 서버 검증 포함
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        // user가 유효하면 session 가져오기
        supabase.auth.getSession().then(({ data: { session } }) => {
          setAuth(user, session)
        })
      } else {
        setAuth(null, null)
      }
      setLoading(false)
    })

    // 인증 상태 변화 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session?.user ?? null, session)
    })

    return () => subscription.unsubscribe()
  }, [])
  return (
    <>
      <Routes>
        {/* 인증 불필요 라우트 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignOnPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* 인증 필요 라우트 (DefaultLayout 사용) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }
        >
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
