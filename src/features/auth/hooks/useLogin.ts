import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import type { LoginForm } from "../types";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginForm) => {
      return api.post(`/login`, data);
    },
  });
}
