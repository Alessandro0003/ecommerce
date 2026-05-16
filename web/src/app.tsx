import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/modules/cart";
import { RoleSwitcher } from "@/components/layout/role-switcher";
import { router } from "@/routes";

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
          <RoleSwitcher />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
