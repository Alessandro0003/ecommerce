import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "@/components/layout/public-layout";
import { AdminLayout } from "@/components/layout/admin-layout";
import { ProtectedRoute } from "@/components/layout/protected-route";

import HomePage from "@/pages/public/home";
import ProductDetailsPage from "@/pages/public/product-details";
import LoginPage from "@/pages/public/login";
import RegisterPage from "@/pages/public/register";

import ProfilePage from "@/pages/user/profile";
import CartPage from "@/pages/user/cart";
import CheckoutPage from "@/pages/user/checkout";
import OrderPendingPage from "@/pages/user/order-pending";
import OrdersPage from "@/pages/user/orders";

import AdminDashboardPage from "@/pages/admin/dashboard";
import AdminProductsListPage from "@/pages/admin/products-list";
import AdminProductCreatePage from "@/pages/admin/product-create";
import AdminProductEditPage from "@/pages/admin/product-edit";
import AdminPromotionsPage from "@/pages/admin/promotions";

export const router = createBrowserRouter([
  // Auth — sem PublicLayout (full-screen próprio)
  { path: "/login", element: <LoginPage /> },
  { path: "/registro", element: <RegisterPage /> },

  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/produto/:id", element: <ProductDetailsPage /> },
      { path: "/carrinho", element: <CartPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/perfil", element: <ProfilePage /> },
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/pedido/:id/aguardando", element: <OrderPendingPage /> },
          { path: "/pedidos", element: <OrdersPage /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute adminOnly />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <AdminDashboardPage /> },
          { path: "/admin/produtos", element: <AdminProductsListPage /> },
          { path: "/admin/produtos/novo", element: <AdminProductCreatePage /> },
          {
            path: "/admin/produtos/:id/editar",
            element: <AdminProductEditPage />,
          },
          { path: "/admin/promocoes", element: <AdminPromotionsPage /> },
        ],
      },
    ],
  },
]);
