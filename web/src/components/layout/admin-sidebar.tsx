import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Tag, ShoppingBag, PawPrint } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Produtos", icon: Package, to: "/admin/produtos" },
  { label: "Promoções", icon: Tag, to: "/admin/promocoes" },
  { label: "Pedidos", icon: ShoppingBag, to: "/admin/pedidos" },
];

function SidebarContent() {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b px-6 py-5 text-xl font-bold text-primary">
        <PawPrint className="h-6 w-6" />
        PetShop
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map(({ label, icon: Icon, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

type Props = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

export function AdminSidebar({ mobileOpen, onMobileOpenChange }: Props) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu de navegação</SheetTitle>
            <SheetDescription>Navegue pelas seções do painel administrativo</SheetDescription>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
