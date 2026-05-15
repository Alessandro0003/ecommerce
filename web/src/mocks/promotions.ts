import type { Promotion } from "@/modules/promotion";

export const mockPromotions: Promotion[] = [
  {
    id: "promo-1",
    title: "Ração Premium com 20% OFF",
    description:
      "Aproveite 20% de desconto na Ração Premium para Cães Adultos 15kg. Estoque limitado!",
    discountType: "PERCENT",
    discountValue: 20,
    productId: "prod-1",
    startsAt: "2026-05-01T00:00:00.000Z",
    endsAt: "2026-06-30T23:59:59.000Z",
    active: true,
    bannerImage:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=1200&q=80",
  },
  {
    id: "promo-2",
    title: "Promoção Categoria Cães — R$ 30 de Desconto",
    description:
      "Compre qualquer produto da categoria Cães acima de R$ 100 e ganhe R$ 30 de desconto automático no carrinho.",
    discountType: "FIXED",
    discountValue: 30,
    category: "DOG",
    startsAt: "2026-05-10T00:00:00.000Z",
    endsAt: "2026-05-31T23:59:59.000Z",
    active: true,
    bannerImage:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80",
  },
  {
    id: "promo-3",
    title: "Super Semana Pet — Frete Grátis",
    description:
      "Durante a Super Semana Pet, todas as compras acima de R$ 199 têm frete grátis para todo o Brasil. Não perca!",
    discountType: "FIXED",
    discountValue: 0,
    startsAt: "2026-05-12T00:00:00.000Z",
    endsAt: "2026-05-19T23:59:59.000Z",
    active: true,
    bannerImage:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1200&q=80",
  },
];
