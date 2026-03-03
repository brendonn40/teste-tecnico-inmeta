export interface Card {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: string;
}

export interface CardResponse {
    list: Card[];
    rpp: number;
    page: number;
    more: boolean;
}

export interface Trade {
    id: string;
    userId: string;
    createdAt: string;
    user: {
        name: string;
    };
    tradeCards: TradeCard[];
}

export type TradeCardType = 'OFFERING' | 'RECEIVING';

export interface TradeCard {
    id: string;
    cardId: string;
    tradeId: string;
    type: TradeCardType;
    card: Card;
}

export interface TradeResponse {
    list: Trade[];
    rpp: number;
    page: number;
    more: boolean;
}
