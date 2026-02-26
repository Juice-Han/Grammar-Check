import { useState, type FormEvent, type ChangeEvent, type FocusEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  calculatePasswordStrength,
  getPasswordStrengthText,
} from '../utils/validation'
import { signUp, getAuthErrorMessage } from '../utils/authHelpers'

const SignOnPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const passwordStrength = calculatePasswordStrength(formData.password)
  const passwordStrengthText = getPasswordStrengthText(passwordStrength)

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
    } else if (name === 'password') {
      error = validatePassword(value) || ''
    } else if (name === 'confirmPassword') {
      error = validateConfirmPassword(formData.password, value) || ''
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
    return error
  }

  const validateForm = (): boolean => {
    const emailError = validateEmail(formData.email) || ''
    const passwordError = validatePassword(formData.password) || ''
    const confirmPasswordError =
      validateConfirmPassword(formData.password, formData.confirmPassword) || ''

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    })

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    })

    return !emailError && !passwordError && !confirmPasswordError
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setAuthError(null)

    const { data, error } = await signUp(formData.email, formData.password)

    setIsLoading(false)

    if (error) {
      setAuthError(getAuthErrorMessage(error))
      return
    }

    if (data.user) {
      navigate('/login', {
        state: {
          message:
            '회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요.',
        },
      })
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 'weak') return 'bg-red-500'
    if (passwordStrength === 'medium') return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthWidth = () => {
    if (passwordStrength === 'weak') return 'w-1/3'
    if (passwordStrength === 'medium') return 'w-2/3'
    return 'w-full'
  }

  return (
    <AuthLayout title="회원가입" subtitle="새 계정을 만들어보세요">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div>
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
            autoComplete="new-password"
          />
          {touched.password && formData.password.length > 0 && (
            <div className="mt-2">
              <div className="h-1 bg-gray-200 rounded">
                <div
                  className={`h-1 rounded transition-all ${getPasswordStrengthWidth()} ${getPasswordStrengthColor()}`}
                />
              </div>
              <p className="text-xs mt-1 text-gray-600">
                비밀번호 강도: {passwordStrengthText}
              </p>
            </div>
          )}
        </div>

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : ''}
          disabled={isLoading}
          autoComplete="new-password"
        />

        <Button type="submit" isLoading={isLoading}>
          회원가입
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">이미 계정이 있으신가요? </span>
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            로그인
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default SignOnPage
