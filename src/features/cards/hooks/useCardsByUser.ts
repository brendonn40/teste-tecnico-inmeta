import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Card } from '../types';

function useCardsByUser() {
    const fetchData = async (): Promise<Card[]> => {
        const { data } = await api.get<Card[]>('/me/cards');
        return data;
    };

    return useQuery({
        queryKey: ['cardsByUser'],
        queryFn: fetchData,
        placeholderData: keepPreviousData,
    });
}

export default useCardsByUser;
