import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { type UserForm } from "@/features/user/types";

export function useSignUp() {
  return useMutation({
    mutationFn: (data: UserForm) => {
      return api.post(`/register`, data);
    },
  });
}
