// import { create } from "zustand"
// import { persist, createJSONStorage } from "zustand/middleware"

// export interface User {
//   id: string
//   email: string
//   name: string
//   avatar?: string
//   role: "user" | "admin"
//   createdAt: Date
//   lastLoginAt: Date
// }

// interface AuthState {
//   // State
//   isLoggedIn: boolean
//   user: User | null
//   isLoading: boolean
//   error: string | null

//   // Actions
//   login: (email: string, password: string) => Promise<void>
//   logout: () => void
//   register: (email: string, password: string, name: string) => Promise<void>
//   updateUser: (userData: Partial<User>) => void
//   clearError: () => void
//   setLoading: (loading: boolean) => void
// }

// // Mock API functions (replace with real API calls)
// const mockLogin = async (email: string, password: string): Promise<User> => {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   // Mock validation
//   if (email === "demo@example.com" && password === "password") {
//     return {
//       id: "1",
//       email,
//       name: "Demo User",
//       avatar: "/diverse-user-avatars.png",
//       role: "user",
//       createdAt: new Date(),
//       lastLoginAt: new Date(),
//     }
//   }

//   throw new Error("Invalid credentials")
// }

// const mockRegister = async (email: string, password: string, name: string): Promise<User> => {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   // Mock user creation
//   return {
//     id: Math.random().toString(36).substr(2, 9),
//     email,
//     name,
//     role: "user",
//     createdAt: new Date(),
//     lastLoginAt: new Date(),
//   }
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       // Initial state
//       isLoggedIn: false,
//       user: null,
//       isLoading: false,
//       error: null,

//       // Actions
//       login: async (email: string, password: string) => {
//         set({ isLoading: true, error: null })

//         try {
//           const user = await mockLogin(email, password)
//           set({
//             isLoggedIn: true,
//             user,
//             isLoading: false,
//             error: null,
//           })
//         } catch (error) {
//           set({
//             isLoading: false,
//             error: error instanceof Error ? error.message : "Login failed",
//           })
//           throw error
//         }
//       },

//       logout: () => {
//         set({
//           isLoggedIn: false,
//           user: null,
//           error: null,
//         })
//       },

//       register: async (email: string, password: string, name: string) => {
//         set({ isLoading: true, error: null })

//         try {
//           const user = await mockRegister(email, password, name)
//           set({
//             isLoggedIn: true,
//             user,
//             isLoading: false,
//             error: null,
//           })
//         } catch (error) {
//           set({
//             isLoading: false,
//             error: error instanceof Error ? error.message : "Registration failed",
//           })
//           throw error
//         }
//       },

//       updateUser: (userData: Partial<User>) => {
//         const currentUser = get().user
//         if (currentUser) {
//           set({
//             user: { ...currentUser, ...userData },
//           })
//         }
//       },

//       clearError: () => {
//         set({ error: null })
//       },

//       setLoading: (loading: boolean) => {
//         set({ isLoading: loading })
//       },
//     }),
//     {
//       name: "auth-storage",
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         isLoggedIn: state.isLoggedIn,
//         user: state.user,
//       }),
//     },
//   ),
// )

// // Selectors for better performance
// export const useAuth = () =>
//   useAuthStore((state) => ({
//     isLoggedIn: state.isLoggedIn,
//     user: state.user,
//     isLoading: state.isLoading,
//     error: state.error,
//   }))

// export const useAuthActions = () =>
//   useAuthStore((state) => ({
//     login: state.login,
//     logout: state.logout,
//     register: state.register,
//     updateUser: state.updateUser,
//     clearError: state.clearError,
//     setLoading: state.setLoading,
//   }))
