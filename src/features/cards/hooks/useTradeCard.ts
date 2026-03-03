import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import type { TradeCardType } from "../types";

interface TradeCardsRequest {
    cards: {
        cardId: string,
        type: TradeCardType
    }[]
}

export function useTradeCards() {
    return useMutation({
        mutationFn: (data: TradeCardsRequest) => {
            return api.post(`/trades`, data);
        },
    });
}
