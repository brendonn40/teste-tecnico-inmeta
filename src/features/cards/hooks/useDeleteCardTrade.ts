import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

function useDeleteCardTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/trades/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    },
  });
}

export default useDeleteCardTrade;