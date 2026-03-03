import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Plus, ArrowRightLeft, Check } from "lucide-react";
import useCards from "@/features/cards/hooks/useCards";
import useCardsByUser from "@/features/cards/hooks/useCardsByUser";
import { useTradeCards } from "@/features/cards/hooks/useTradeCard";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { Card } from "@/features/cards/types";
import { cn } from "@/lib/utils";

export function TradeSheet() {
    const [selectedOffering, setSelectedOffering] = useState<Card | null>(null);
    const [selectedReceiving, setSelectedReceiving] = useState<Card | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();
    const { data: myCards, isLoading: isLoadingMyCards } = useCardsByUser();
    const { data: allCardsPages, isLoading: isLoadingAllCards, fetchNextPage, hasNextPage, isFetchingNextPage } = useCards();
    const { mutate: createTrade, isPending } = useTradeCards();

    const allCards = allCardsPages?.pages.flatMap((page) => page.list) ?? [];

    const handleCreateTrade = () => {
        if (!selectedOffering || !selectedReceiving) {
            toast.error("Selecione ambas as cartas para a troca.");
            return;
        }

        createTrade({
            cards: [
                { cardId: selectedOffering.id, type: "OFFERING" },
                { cardId: selectedReceiving.id, type: "RECEIVING" }
            ]
        }, {
            onSuccess: () => {
                toast.success("Solicitação de troca criada com sucesso!");
                queryClient.invalidateQueries({ queryKey: ['trades'] });
                setIsOpen(false);
                resetSelection();
            },
            onError: () => {
                toast.error("Falha ao criar a solicitação de troca.");
            }
        });
    };

    const resetSelection = () => {
        setSelectedOffering(null);
        setSelectedReceiving(null);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Troca
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xl flex flex-col h-full overflow-hidden p-0">
                <div className="p-6 pb-2 border-b">
                    <SheetHeader>
                        <SheetTitle>Criar Solicitação de Troca</SheetTitle>
                        <SheetDescription>
                            Escolha uma carta para oferecer e uma para receber em troca.
                        </SheetDescription>
                    </SheetHeader>
                </div>

                <div className="flex-grow overflow-hidden flex flex-col lg:flex-row gap-0">
                    {/* Offering Section */}
                    <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r overflow-hidden h-[40vh] lg:h-auto">
                        <div className="p-4 bg-muted/30 font-semibold text-sm flex items-center justify-between">
                            <span>Oferecer</span>
                            {selectedOffering && <span className="text-xs text-primary font-bold">Selecionada</span>}
                        </div>
                        <ScrollArea className="flex-grow p-4">
                            {isLoadingMyCards ? (
                                <div className="flex justify-center p-8"><Loader2 className="animate-spin h-6 w-6" /></div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {myCards?.map(card => (
                                        <div
                                            key={card.id}
                                            onClick={() => setSelectedOffering(card)}
                                            className={cn(
                                                "cursor-pointer group relative rounded-lg border-2 p-1 transition-all",
                                                selectedOffering?.id === card.id ? "border-primary bg-primary/5" : "border-transparent hover:border-border"
                                            )}
                                        >
                                            <img src={card.imageUrl} alt={card.name} className="aspect-[3/4] object-cover rounded-md" />
                                            {selectedOffering?.id === card.id && (
                                                <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5 text-white shadow-md">
                                                    <Check className="h-3 w-3" />
                                                </div>
                                            )}
                                            <p className="text-[10px] font-bold mt-1 line-clamp-1">{card.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    {/* Receiving Section */}
                    <div className="flex-1 flex flex-col overflow-hidden h-[40vh] lg:h-auto">
                        <div className="p-4 bg-muted/30 font-semibold text-sm flex items-center justify-between border-t lg:border-t-0">
                            <span>Receber</span>
                            {selectedReceiving && <span className="text-xs text-primary font-bold">Selecionada</span>}
                        </div>
                        <ScrollArea className="flex-grow p-4">
                            {isLoadingAllCards ? (
                                <div className="flex justify-center p-8"><Loader2 className="animate-spin h-6 w-6" /></div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {allCards.map(card => (
                                        <div
                                            key={card.id}
                                            onClick={() => setSelectedReceiving(card)}
                                            className={cn(
                                                "cursor-pointer group relative rounded-lg border-2 p-1 transition-all",
                                                selectedReceiving?.id === card.id ? "border-primary bg-primary/5" : "border-transparent hover:border-border"
                                            )}
                                        >
                                            <img src={card.imageUrl} alt={card.name} className="aspect-[3/4] object-cover rounded-md" />
                                            {selectedReceiving?.id === card.id && (
                                                <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5 text-white shadow-md">
                                                    <Check className="h-3 w-3" />
                                                </div>
                                            )}
                                            <p className="text-[10px] font-bold mt-1 line-clamp-1">{card.name}</p>
                                        </div>
                                    ))}
                                    {hasNextPage && (
                                        <div className="col-span-2 flex justify-center mt-12 pb-12">
                                            <Button
                                                onClick={() => fetchNextPage()}
                                                disabled={isFetchingNextPage}
                                                size="lg"
                                                className="min-w-[140px] shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                                            >
                                                {isFetchingNextPage ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Carregando...
                                                    </>
                                                ) : (
                                                    'Carregar Mais Cartas'
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>

                <div className="p-6 border-t bg-card mt-auto">
                    <div className="flex items-center justify-between mb-6 gap-4">
                        <div className="flex-1 text-center p-2 rounded-lg bg-muted/50 border">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Oferecendo</p>
                            <p className="text-xs font-bold truncate">{selectedOffering?.name || "..."}</p>
                        </div>
                        <ArrowRightLeft className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div className="flex-1 text-center p-2 rounded-lg bg-muted/50 border">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Recebendo</p>
                            <p className="text-xs font-bold truncate">{selectedReceiving?.name || "..."}</p>
                        </div>
                    </div>
                    <SheetFooter className="sm:flex-col gap-2">
                        <Button
                            className="w-full"
                            disabled={!selectedOffering || !selectedReceiving || isPending}
                            onClick={handleCreateTrade}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processando...
                                </>
                            ) : "Confirmar Solicitação"}
                        </Button>
                        <SheetClose asChild>
                            <Button variant="outline" className="w-full">Cancelar</Button>
                        </SheetClose>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
}
