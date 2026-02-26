import { useState, type FormEvent, type ChangeEvent, type FocusEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { validateEmail } from '../utils/validation'
import { signIn, getAuthErrorMessage } from '../utils/authHelpers'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.message

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name as keyof typeof touched]) {
      validateField(name as keyof typeof formData, value)
    }

    if (authError) {
      setAuthError(null)
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name as keyof typeof formData, value)
  }

  const validateField = (name: keyof typeof formData, value: string) => {
    let error = ''

    if (name === 'email') {
      error = validateEmail(value) || ''
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
    return error
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    setAuthError(null)

    const { data, error } = await signIn(formData.email, formData.password)

    setIsLoading(false)

    if (error) {
      setAuthError(getAuthErrorMessage(error))
      return
    }

    if (data.session) {
      navigate('/')
    }
  }

  return (
    <AuthLayout title="로그인" subtitle="맞춤법을 검사하고 틀린 문법을 공부해보세요">
      <form onSubmit={handleSubmit} className="space-y-6">
        {successMessage && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        {authError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{authError}</p>
          </div>
        )}

        <Input
          id="email"
          name="email"
          type="email"
          label="이메일"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : ''}
          disabled={isLoading}
          autoComplete="email"
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : ''}
          disabled={isLoading}
          autoComplete="current-password"
        />

        <Button type="submit" isLoading={isLoading}>
          로그인
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">계정이 없으신가요? </span>
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            회원가입
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
