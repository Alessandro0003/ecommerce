import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { mockPromotions } from "@/mocks";
import {
  CreatePromotionContainer,
  DeletePromotionContainer,
  ListPromotionContainer,
  UpdatePromotionContainer,
} from "@/modules/promotion";
import type { Promotion, PromotionFormValues } from "@/modules/promotion";

export default function AdminPromotionsPage() {
  useDocumentTitle("Promoções — Admin");
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [deletingPromotion, setDeletingPromotion] = useState<Promotion | null>(null);

  const activePromotions = promotions.filter((p) => p.active);
  const inactivePromotions = promotions.filter((p) => !p.active);

  function handleCreate(values: PromotionFormValues) {
    const newPromotion: Promotion = {
      id: `promo-${Date.now()}`,
      title: values.title,
      description: values.description,
      discountType: values.discountType,
      discountValue: values.discountValue,
      productId: values.targetType === "PRODUCT" ? values.productId : undefined,
      category: values.targetType === "CATEGORY" ? values.category : undefined,
      startsAt: new Date(values.startsAt).toISOString(),
      endsAt: new Date(values.endsAt).toISOString(),
      active: values.active,
      bannerImage: values.bannerImage || undefined,
    };
    setPromotions((prev) => [...prev, newPromotion]);
  }

  function handleUpdate(id: string, values: PromotionFormValues) {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title: values.title,
              description: values.description,
              discountType: values.discountType,
              discountValue: values.discountValue,
              productId:
                values.targetType === "PRODUCT" ? values.productId : undefined,
              category:
                values.targetType === "CATEGORY" ? values.category : undefined,
              startsAt: new Date(values.startsAt).toISOString(),
              endsAt: new Date(values.endsAt).toISOString(),
              active: values.active,
              bannerImage: values.bannerImage || undefined,
            }
          : p,
      ),
    );
  }

  function handleDelete(id: string) {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
    setDeletingPromotion(null);
  }

  function handleEditRequest(id: string) {
    setEditingPromotion(promotions.find((p) => p.id === id) ?? null);
  }

  function handleDeleteRequest(id: string) {
    setDeletingPromotion(promotions.find((p) => p.id === id) ?? null);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Promoções</h1>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">
            Ativas ({activePromotions.length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inativas ({inactivePromotions.length})
          </TabsTrigger>
          <TabsTrigger value="create">Criar nova</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <ListPromotionContainer
            promotions={activePromotions}
            onEdit={handleEditRequest}
            onDelete={handleDeleteRequest}
          />
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          <ListPromotionContainer
            promotions={inactivePromotions}
            onEdit={handleEditRequest}
            onDelete={handleDeleteRequest}
          />
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <CreatePromotionContainer onSubmit={handleCreate} />
        </TabsContent>
      </Tabs>

      <UpdatePromotionContainer
        promotion={editingPromotion}
        onClose={() => setEditingPromotion(null)}
        onSubmit={handleUpdate}
      />

      <DeletePromotionContainer
        promotion={deletingPromotion}
        onClose={() => setDeletingPromotion(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
