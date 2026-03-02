import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        404 - Página Não Encontrada
      </h1>
      <p className="text-base md:text-lg mb-8">
        Ops! A página que você está procurando não existe.
      </p>
      <Button className="w-full max-w-xs" onClick={() => navigate('/')}>
        Ir para a Página Inicial
      </Button>
    </div>
  );
}
