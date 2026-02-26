import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthStore()

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    )
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>
}

export default ProtectedRoute
