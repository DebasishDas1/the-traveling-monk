import { create } from 'zustand'

interface NavigationState {
  mobileOpen: boolean

  setMobileOpen: (open: boolean) => void

  toggleMobile: () => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  mobileOpen: false,

  setMobileOpen: (open) =>
    set({
      mobileOpen: open,
    }),

  toggleMobile: () =>
    set((state) => ({
      mobileOpen: !state.mobileOpen,
    })),
}))
