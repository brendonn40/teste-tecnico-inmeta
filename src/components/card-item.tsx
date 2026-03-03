import { usePostCard } from '@/features/cards/hooks/usePostCard';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import type { Card as CardType } from '@/features/cards/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CardItemProps {
    card: CardType;
    isOwned: boolean;
}

export function CardItem({ card, isOwned }: CardItemProps) {
    const queryClient = useQueryClient();
    const { mutate: acquireCard, isPending } = usePostCard(card.id);

    const handleAcquire = () => {
        acquireCard(undefined, {
            onSuccess: () => {
                toast.success(`Carta "${card.name}" adquirida com sucesso!`);
                queryClient.invalidateQueries({ queryKey: ['cardsByUser'] });
            },
            onError: () => {
                toast.error(`Falha ao adquirir a carta "${card.name}".`);
            }
        });
    };

    return (
        <Card key={card.id} className="gap-0 flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm group">
            <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                {card?.imageUrl ? (
                    <img
                        src={card.imageUrl}
                        alt={card?.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/50">
                        Sem imagem
                    </div>
                )}
                {isOwned && (
                    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1">
                        <Wallet className="h-3 w-3" />
                        ADQUIRIDA
                    </div>
                )}
            </div>
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg line-clamp-1 font-bold">{card?.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {card?.description || 'Sem descrição disponível.'}
                </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                <Button
                    className="w-full shadow-sm"
                    variant={isOwned ? "secondary" : "default"}
                    disabled={isOwned || isPending}
                    onClick={handleAcquire}
                    size="sm"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adquirindo...
                        </>
                    ) : isOwned ? (
                        'Já Adquirida'
                    ) : (
                        <>
                            <Wallet className="mr-2 h-4 w-4" />
                            Adquirir
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}