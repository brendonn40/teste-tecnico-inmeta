import { Loader2, ArrowRightLeft, Trash2, Calendar, User as UserIcon } from 'lucide-react';
import useCardTrades from '@/features/cards/hooks/useCardTrades';
import useDeleteCardTrade from '@/features/cards/hooks/useDeleteCardTrade';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TradeSheet } from '@/components/trades/trade-sheet';
import { toast } from 'sonner';
import { useAuth } from '@/components/providers/auth';

export default function Trades() {
    const { user } = useAuth();
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useCardTrades();

    const { mutate: deleteTrade, isPending: isDeleting } = useDeleteCardTrade();

    const handleCancelTrade = (id: string, cardName: string) => {
        if (window.confirm(`Tem certeza que deseja cancelar a troca da carta "${cardName}"?`)) {
            deleteTrade(id, {
                onSuccess: () => {
                    toast.success("Solicitação de troca cancelada.");
                },
                onError: () => {
                    toast.error("Falha ao cancelar a troca.");
                }
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-destructive">Erro ao carregar as trocas.</p>
            </div>
        );
    }

    const trades = data?.pages.flatMap((page) => page.list) ?? [];

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-center md:text-left">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Solicitações de Troca</h1>
                    <p className="text-muted-foreground mt-1">Gerencie suas ofertas e veja o que outros estão buscando.</p>
                </div>
                <TradeSheet />
            </div>

            {trades.length === 0 ? (
                <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
                    <p className="text-2xl font-medium text-muted-foreground">Nenhuma solicitação de troca ativa.</p>
                    <p className="text-muted-foreground mt-2">Clique em "Nova Troca" para começar!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trades.map((trade) => {
                        const offering = trade.tradeCards.find(tc => tc.type === 'OFFERING')?.card;
                        const receiving = trade.tradeCards.find(tc => tc.type === 'RECEIVING')?.card;

                        return (
                            <Card key={trade.id} className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(trade.createdAt).toLocaleDateString()}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                        onClick={() => handleCancelTrade(trade.id, offering?.name || "Desconhecida")}
                                        disabled={isDeleting || trade.userId !== user?.id}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4 justify-between">
                                        {/* Offering */}
                                        <div className="flex flex-col items-center gap-2 flex-1">
                                            <div className="aspect-[3/4] w-full rounded-md overflow-hidden bg-muted relative">
                                                {offering?.imageUrl ? (
                                                    <img src={offering.imageUrl} alt={offering.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px]">Sem imagem</div>
                                                )}
                                                <div className="absolute top-1 left-1">
                                                    <Badge variant="secondary" className="text-[10px] h-4 px-1">OF</Badge>
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold truncate w-full text-center">{offering?.name || '...'}</p>
                                        </div>

                                        <div className="bg-primary/10 rounded-full p-2">
                                            <ArrowRightLeft className="h-4 w-4 text-primary" />
                                        </div>

                                        {/* Receiving */}
                                        <div className="flex flex-col items-center gap-2 flex-1">
                                            <div className="aspect-[3/4] w-full rounded-md overflow-hidden bg-muted relative">
                                                {receiving?.imageUrl ? (
                                                    <img src={receiving.imageUrl} alt={receiving.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px]">Sem imagem</div>
                                                )}
                                                <div className="absolute top-1 left-1">
                                                    <Badge variant="default" className="text-[10px] h-4 px-1">RC</Badge>
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold truncate w-full text-center">{receiving?.name || '...'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 border-t bg-muted/20 flex items-center gap-2 text-[10px] font-medium text-muted-foreground w-full">
                                    <UserIcon className="h-3 w-3" />
                                    SOLICITADO POR: <span className="text-foreground uppercase">{trade.user?.name || 'VOCÊ'}</span>
                                </CardFooter>
                            </Card>
                        );
                    })}
                    {hasNextPage && (
                        <div className="flex col-span-full justify-center mt-12 pb-12">
                            <Button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                size="lg"
                                className="min-w-[220px] shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                            >
                                {isFetchingNextPage ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Carregando...
                                    </>
                                ) : (
                                    'Carregar Mais Solicitações'
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}