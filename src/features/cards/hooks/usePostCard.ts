import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function usePostCard(id: string) {
  return useMutation({
    mutationFn: () => {
      return api.post(`/me/cards`, { cardIds: [id] });
    },
  });
}
