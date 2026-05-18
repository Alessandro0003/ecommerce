import { DollarSign, Package, ShoppingBag, Tag, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusBadge } from "@/modules/order";
import { mockOrders, mockProducts, mockPromotions } from "@/mocks";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

const today = new Date();
const todayStr = today.toISOString().slice(0, 10);
const currentMonth = today.toISOString().slice(0, 7);

const todayOrders = mockOrders.filter(
  (o) => o.createdAt.slice(0, 10) === todayStr,
);

const monthlySales = mockOrders
  .filter(
    (o) =>
      ["PAID", "SHIPPED", "DELIVERED"].includes(o.status) &&
      o.createdAt.slice(0, 7) === currentMonth,
  )
  .reduce((sum, o) => sum + o.total, 0);

const activePromotions = mockPromotions.filter((p) => p.active);

const recentOrders = [...mockOrders]
  .sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  .slice(0, 5);

const lowStockProducts = mockProducts
  .filter((p) => p.stock < 10)
  .sort((a, b) => a.stock - b.stock);

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

type SummaryCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
};

function SummaryCard({ title, value, icon, trend }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-1 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
          <TrendingUp className="h-3 w-3" />
          <span>{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total de produtos"
          value={mockProducts.length}
          icon={<Package className="h-4 w-4" />}
          trend="+12% vs ontem"
        />
        <SummaryCard
          title="Pedidos do dia"
          value={todayOrders.length}
          icon={<ShoppingBag className="h-4 w-4" />}
          trend="+8% vs ontem"
        />
        <SummaryCard
          title="Vendas do mês"
          value={formatCurrency(monthlySales)}
          icon={<DollarSign className="h-4 w-4" />}
          trend="+23% vs mês anterior"
        />
        <SummaryCard
          title="Promoções ativas"
          value={activePromotions.length}
          icon={<Tag className="h-4 w-4" />}
          trend="+2 esta semana"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Últimos pedidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="font-medium">
                    #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <OrderStatusBadge status={order.status} />
                  <span className="font-medium">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Produtos com estoque baixo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Todos os produtos estão com estoque adequado.
              </p>
            ) : (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 text-sm"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-9 w-9 shrink-0 rounded border object-cover"
                  />
                  <p className="min-w-0 flex-1 truncate font-medium">
                    {product.name}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                      product.stock === 0
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        : product.stock < 5
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
                    )}
                  >
                    {product.stock} un.
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
