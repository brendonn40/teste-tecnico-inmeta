import {
  LayoutGrid,
  type LucideIcon,
  Wallet,
  ArrowLeftRight
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Mercado de Cartas",
          active: pathname === "/",
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/my-cards",
          label: "Minhas Cartas",
          active: pathname === "/my-cards",
          icon: Wallet,
          submenus: []
        },
        {
          href: "/trades",
          label: "Trocas",
          active: pathname === "/trades",
          icon: ArrowLeftRight,
          submenus: []
        },
      ]
    },

  ];
}
