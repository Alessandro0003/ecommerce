import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
