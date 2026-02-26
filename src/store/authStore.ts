import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
}

interface AuthActions {
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setAuth: (user: User | null, session: Session | null) => void
  clearAuth: () => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  // 초기 상태
  user: null,
  session: null,
  isLoading: true,

  // 액션
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setAuth: (user, session) => set({ user, session }),
  clearAuth: () => set({ user: null, session: null }),
  setLoading: (isLoading) => set({ isLoading }),
}))
