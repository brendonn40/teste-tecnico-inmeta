import { Bell, Home, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function SideMenu() {
  const menuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      text: 'Início',
      path: '/',
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">CardFlux</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                {item.icon}
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
