import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { CardResponse } from '../types';


function useCards() {
    const fetchData = async ({ pageParam = 1 }): Promise<CardResponse> => {
        const { data } = await api.get<CardResponse>(`/cards?rpp=10&page=${pageParam}`);
        return data;
    };

    return useInfiniteQuery({
        queryKey: ['cards'],
        queryFn: fetchData,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.more ? lastPage.page + 1 : undefined;
        },
    });
}

export default useCards;
