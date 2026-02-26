export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const UPPERCASE_REGEX = /[A-Z]/
export const LOWERCASE_REGEX = /[a-z]/
export const NUMBER_REGEX = /[0-9]/
export const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/

export const validateEmail = (email: string): string | undefined => {
  if (!email) return '이메일을 입력해주세요.'
  if (!EMAIL_REGEX.test(email)) return '유효한 이메일 주소를 입력해주세요.'
  return undefined
}

export const validatePassword = (password: string): string | undefined => {
  if (!password) return '비밀번호를 입력해주세요.'
  if (password.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.'
  if (!UPPERCASE_REGEX.test(password)) return '대문자를 최소 1개 포함해야 합니다.'
  if (!LOWERCASE_REGEX.test(password)) return '소문자를 최소 1개 포함해야 합니다.'
  if (!NUMBER_REGEX.test(password)) return '숫자를 최소 1개 포함해야 합니다.'
  if (!SPECIAL_CHAR_REGEX.test(password))
    return '특수문자를 최소 1개 포함해야 합니다.'
  return undefined
}

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword) return '비밀번호 확인을 입력해주세요.'
  if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다.'
  return undefined
}

export const calculatePasswordStrength = (
  password: string
): 'weak' | 'medium' | 'strong' => {
  let strength = 0
  if (password.length >= 8) strength++
  if (UPPERCASE_REGEX.test(password)) strength++
  if (LOWERCASE_REGEX.test(password)) strength++
  if (NUMBER_REGEX.test(password)) strength++
  if (SPECIAL_CHAR_REGEX.test(password)) strength++

  if (strength <= 2) return 'weak'
  if (strength <= 4) return 'medium'
  return 'strong'
}

export const getPasswordStrengthText = (
  strength: 'weak' | 'medium' | 'strong'
): string => {
  const strengthMap = {
    weak: '약함',
    medium: '보통',
    strong: '강함',
  }
  return strengthMap[strength]
}
