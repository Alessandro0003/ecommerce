import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <h1>Hello World</h1>
      <Toaster />
    </ThemeProvider>
  );
}
