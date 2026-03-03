import { Loader2, Wallet } from 'lucide-react';
import useCardsByUser from '@/features/cards/hooks/useCardsByUser';
import { CardItem } from '@/components/card-item';

export default function MyCards() {
    const {
        data: ownedCards,
        isLoading,
        isError: isErrorCards,
    } = useCardsByUser();


    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isErrorCards) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-destructive">Erro ao carregar as cartas.</p>
            </div>
        );
    }

    const cards = ownedCards ?? [];

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Minhas Cartas</h1>
                    <p className="text-muted-foreground mt-1">Suas cartas adquiridas.</p>
                </div>
                {ownedCards && (
                    <div className="bg-secondary/50 border border-border px-4 py-2 rounded-lg flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{ownedCards.length}</span>
                        <span className="text-muted-foreground text-sm">Cartas na coleção</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {cards.map((card) => (
                    <CardItem
                        key={card.id}
                        card={card}
                        isOwned={true}
                    />
                ))}
            </div>

            {cards.length === 0 && !isLoading && (
                <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
                    <p className="text-2xl font-medium text-muted-foreground">Nenhuma carta disponível no momento.</p>
                </div>
            )}
        </div>
    );
}