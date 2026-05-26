import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ListOrderContainer } from "@/modules/order";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { mockOrders } from "@/mocks";
import type { OrderStatus } from "@/modules/order";

type TabValue = "all" | OrderStatus;

const tabs: { value: TabValue; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "PENDING", label: "Pendentes" },
  { value: "PROCESSING", label: "Processando" },
  { value: "PAID", label: "Pagos" },
  { value: "SHIPPED", label: "Enviados" },
  { value: "DELIVERED", label: "Entregues" },
];

export default function OrdersPage() {
  useDocumentTitle("Meus pedidos");
  const [activeTab, setActiveTab] = useState<TabValue>("all");

  const filteredOrders =
    activeTab === "all"
      ? mockOrders
      : mockOrders.filter((o) => o.status === activeTab);

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">Meus Pedidos</h1>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
      >
        <TabsList className="flex-wrap h-auto gap-1">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <ListOrderContainer orders={filteredOrders} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
