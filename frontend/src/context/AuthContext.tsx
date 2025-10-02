// frontend/src/context/AuthContext.tsx
import { createContext, useReducer, useContext, ReactNode, useCallback, useEffect } from 'react'
import {
  AuthState,
  LoginCredentials,
  AuthResult,
  User,
  PasswordChangePayload,
} from '@/types/auth'
import { API_BASE_URL } from '@/lib/api'

// --- Action types ---
export const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
} as const

type AuthAction =
  | { type: typeof AUTH_ACTIONS.LOGIN_SUCCESS; payload: { token: string } }
  | { type: typeof AUTH_ACTIONS.LOGOUT }
  | { type: typeof AUTH_ACTIONS.SET_LOADING; payload: boolean }
  | { type: typeof AUTH_ACTIONS.SET_USER; payload: User | null }

// --- Initial state helper ---
const getInitialState = (): AuthState => ({
  isAuthenticated: Boolean(localStorage.getItem('token')),
  token: localStorage.getItem('token'),
  isLoading: Boolean(localStorage.getItem('token')),
  user: null,
})

// --- Reducer ---
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        isLoading: false,
      }
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isLoading: false,
        user: null,
      }
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload }
    case AUTH_ACTIONS.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}

// --- Contexts ---
const AuthStateContext = createContext<AuthState | undefined>(undefined)
const AuthDispatchContext = createContext<{
  login: (c: LoginCredentials) => Promise<AuthResult>
  logout: () => void
  changePassword: (payload: PasswordChangePayload) => Promise<AuthResult>
} | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, undefined, getInitialState)

  // Fetch current user when we have a token
  const fetchCurrentUser = useCallback(async (token: string) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const user = (await res.json()) as User
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user })
      } else {
        localStorage.removeItem('token')
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
      }
    } catch (err) {
      console.error('Failed to fetch user:', err)
      localStorage.removeItem('token')
      dispatch({ type: AUTH_ACTIONS.LOGOUT })
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
    }
  }, [])

  // login action
  const login = useCallback(
    async (creds: LoginCredentials): Promise<AuthResult> => {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(creds),
        })
        const data = await res.json()
        if (!res.ok) {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
          return { success: false, error: data.detail || 'Login failed' }
        }
        localStorage.setItem('token', data.access_token)
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { token: data.access_token },
        })
        fetchCurrentUser(data.access_token)
        return { success: true, error: null }
      } catch (err: any) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
        return { success: false, error: err.message }
      }
    },
    [fetchCurrentUser]
  )

  // logout
  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
  }

  const changePassword = useCallback(
    async ({ currentPassword, newPassword }: PasswordChangePayload): Promise<AuthResult> => {
      const token = state.token ?? localStorage.getItem('token')
      if (!token) {
        return { success: false, error: 'Not authenticated' }
      }

      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        })

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('token')
            dispatch({ type: AUTH_ACTIONS.LOGOUT })
            return {
              success: false,
              error: 'Session expired. Please sign in again.',
            }
          }

          let errorMessage = 'Failed to change password'
          const raw = await res.text()
          if (raw) {
            try {
              const data = JSON.parse(raw)
              errorMessage = data.detail || raw
            } catch {
              errorMessage = raw
            }
          }

          return { success: false, error: errorMessage }
        }

        return { success: true, error: null }
      } catch (err: any) {
        return { success: false, error: err.message }
      } finally {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      }
    },
    [state.token]
  )

  useEffect(() => {
    if (state.token && !state.user) {
      fetchCurrentUser(state.token)
    }
  }, [state.token, state.user, fetchCurrentUser])

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={{ login, logout, changePassword }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

// --- Hooks ---
export function useAuthState(): AuthState {
  const ctx = useContext(AuthStateContext)
  if (!ctx) {
    throw new Error('useAuthState must be inside AuthProvider')
  }
  return ctx
}

export function useAuthDispatch() {
  const ctx = useContext(AuthDispatchContext)
  if (!ctx) {
    throw new Error('useAuthDispatch must be inside AuthProvider')
  }
  return ctx
}

export function useAuth() {
  const state = useAuthState()
  const { login, logout, changePassword } = useAuthDispatch()
  return { ...state, login, logout, changePassword }
}
