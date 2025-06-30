import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS, THEMES } from '@constants'

/**
 * 全局状态管理
 * 包含用户信息、UI状态、主题等
 */
export const useGlobalStore = create(
  persist(
    (set, get) => ({
      // 用户相关状态
      user: null,
      token: null,
      isAuthenticated: false,

      // UI状态
      sidebarCollapsed: false,
      theme: THEMES.LIGHT,
      loading: false,

      // 面包屑导航
      breadcrumbs: [],

      // Actions - 用户相关
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setToken: (token) => set({ token, isAuthenticated: !!token }),

      login: (userInfo, token) => set({
        user: userInfo,
        token,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false
      }),

      // Actions - UI状态
      toggleSidebar: () => set((state) => ({
        sidebarCollapsed: !state.sidebarCollapsed
      })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      setTheme: (theme) => set({ theme }),

      setLoading: (loading) => set({ loading }),

      setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

      // 清空状态
      reset: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        sidebarCollapsed: false,
        theme: THEMES.LIGHT,
        loading: false,
        breadcrumbs: []
      })
    }),
    {
      name: 'global-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme
      })
    }
  )
)