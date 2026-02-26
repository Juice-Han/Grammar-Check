import { supabase } from '../lib/supabase'
import type { AuthError } from '@supabase/supabase-js'

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'Email not confirmed': '이메일 인증이 필요합니다. 메일함을 확인해주세요.',
  'User already registered': '이미 가입된 이메일입니다.',
  'Password should be at least 6 characters':
    '비밀번호는 최소 6자 이상이어야 합니다.',
  'Signups not allowed': '현재 회원가입이 불가능합니다.',
  'Network request failed': '네트워크 연결을 확인해주세요.',
  'Unable to validate email address: invalid format':
    '유효한 이메일 형식이 아닙니다.',
}

export const getAuthErrorMessage = (error: AuthError | null): string => {
  if (!error) return '알 수 없는 오류가 발생했습니다.'
  return (
    AUTH_ERROR_MESSAGES[error.message] || error.message || '오류가 발생했습니다.'
  )
}

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as AuthError }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as AuthError }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error as AuthError }
  }
}
