import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { TradeResponse } from '../types';

function useCardTrades() {
    const fetchData = async ({ pageParam = 1 }): Promise<TradeResponse> => {
        const { data } = await api.get<TradeResponse>(`/trades?rpp=10&page=${pageParam}`);
        return data;
    };
    return useInfiniteQuery({
        queryKey: ['card-trades'],
        queryFn: fetchData,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.more ? lastPage.page + 1 : undefined;
        },
    });
}

export default useCardTrades;
