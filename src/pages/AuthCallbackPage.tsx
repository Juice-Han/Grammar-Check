import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AuthLayout from '../components/auth/AuthLayout'

const AuthCallbackPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/')
      } else if (event === 'USER_UPDATED') {
        navigate('/')
      }
    })

    // URL 해시에서 에러 확인
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const errorDescription = hashParams.get('error_description')
    if (errorDescription) {
      setError(decodeURIComponent(errorDescription))
    }

    return () => subscription.unsubscribe()
  }, [navigate])

  if (error) {
    return (
      <AuthLayout title="인증 실패" subtitle="이메일 인증 중 문제가 발생했습니다">
        <div className="text-center space-y-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="이메일 인증 중" subtitle="잠시만 기다려주세요">
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <svg
          className="animate-spin h-12 w-12 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-gray-600">이메일 인증을 처리하고 있습니다...</p>
      </div>
    </AuthLayout>
  )
}

export default AuthCallbackPage
