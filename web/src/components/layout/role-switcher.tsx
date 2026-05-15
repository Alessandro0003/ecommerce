import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getRoleBadge(role: string | null) {
  if (!role) return <Badge variant="secondary">Guest</Badge>;
  if (role === "ADMIN") return <Badge className="bg-purple-600 text-white">Admin</Badge>;
  return <Badge className="bg-blue-600 text-white">User</Badge>;
}

export function RoleSwitcher() {
  if (!import.meta.env.DEV) return null;

  const { user, login, loginAsAdmin, logout } = useAuth();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 shadow-lg">
            Role: {getRoleBadge(user?.role ?? null)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Trocar role (dev)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <span>Guest (deslogado)</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={login}>
            <span>Usuário comum</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={loginAsAdmin}>
            <span>Admin</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
