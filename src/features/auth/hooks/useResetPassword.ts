import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { password: string }) => {
      return api.post(`/auth/reset-password`, data);
    },
  });
}
