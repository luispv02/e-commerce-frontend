import { useMutation } from "@tanstack/react-query"
import { loginAction, registerAction, renewAction } from "../actions/auth.action"
import type { AuthError, AuthResponse, UserFormValues } from "../interface/auth"
import type { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useAuthStore } from "../store/auth.store"


export const useAuth = () => {

  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  const registerMutation = useMutation<AuthResponse, AxiosError<AuthError>, UserFormValues>({
      mutationFn: registerAction,
      onSuccess: ({ data }) => {
        login(data.user, data.token)
      },
      onError: (error) => {
        toast.error(error.response?.data.msg || 'Error al registrar usuario')
      }
  })

  const loginMutation = useMutation<AuthResponse, AxiosError<AuthError>, UserFormValues>({
    mutationFn: loginAction,
    onSuccess: ({ data }) => {
      login(data.user, data.token)
    },
    onError: (error) => {
      toast.error(error.response?.data.msg || 'Error al iniciar sesión')
    }
  })

  const renewMutation = useMutation<AuthResponse, AxiosError<AuthError>>({
    mutationFn: renewAction,
    onSuccess: ({ data }) => {
      login(data.user, data.token)
    },
    onError: () => {
      logout()
    }
  })


  return {
      registerMutation,
      loginMutation,
      renewMutation
  }
}

