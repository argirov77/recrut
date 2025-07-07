import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react'
import { AppState, Theme, NotificationType } from '../types'

// ==== Типы экшенов ====
export const ACTIONS = {
  SET_THEME: 'SET_THEME',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
} as const

interface SetThemeAction {
  type: typeof ACTIONS.SET_THEME
  payload: Theme
}

interface SetUserPreferencesAction {
  type: typeof ACTIONS.SET_USER_PREFERENCES
  payload: Record<string, unknown>
}

interface UpdateNotificationAction {
  type: typeof ACTIONS.UPDATE_NOTIFICATION
  payload: {
    message?: string
    type?: NotificationType
    show?: boolean
  }
}

type Action =
  | SetThemeAction
  | SetUserPreferencesAction
  | UpdateNotificationAction

// ==== Инициализация темы ====
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'light'
}

// ==== Начальное состояние ====
const initialState: AppState = {
  theme: getInitialTheme(),
  userPreferences: {},
  notification: {
    message: '',
    type: 'info',
    show: false,
  },
}

// ==== Редьюсер ====
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ACTIONS.SET_THEME: {
      const newTheme = action.payload
      localStorage.setItem('theme', newTheme)
      return { ...state, theme: newTheme }
    }
    case ACTIONS.SET_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload,
        },
      }
    case ACTIONS.UPDATE_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

// ==== Контексты ====
const AppContext = createContext<AppState | null>(null)
const AppDispatchContext = createContext<Dispatch<Action> | null>(null)

// ==== Провайдер ====
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Синхронизируем класс темы на <html> при изменении
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(state.theme)
  }, [state.theme])

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

// ==== Хуки ====
export function useAppState(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppState must be used inside AppProvider')
  return ctx
}

export function useAppDispatch(): Dispatch<Action> {
  const ctx = useContext(AppDispatchContext)
  if (!ctx)
    throw new Error('useAppDispatch must be used inside AppProvider')
  return ctx
}

// ==== Экшн-криэйторы ====
export function setTheme(dispatch: Dispatch<Action>, theme: Theme) {
  dispatch({ type: ACTIONS.SET_THEME, payload: theme })
}

export function setUserPreferences(
  dispatch: Dispatch<Action>,
  prefs: Record<string, unknown>
) {
  dispatch({ type: ACTIONS.SET_USER_PREFERENCES, payload: prefs })
}

export function showNotification(
  dispatch: Dispatch<Action>,
  message: string,
  type: NotificationType = 'info'
) {
  dispatch({
    type: ACTIONS.UPDATE_NOTIFICATION,
    payload: { message, type, show: true },
  })
  setTimeout(() => {
    dispatch({
      type: ACTIONS.UPDATE_NOTIFICATION,
      payload: { show: false },
    })
  }, 5000)
}
