import type { ShippingOption } from "@/modules/shipping";

export const mockShippingOptions: ShippingOption[] = [
  {
    carrier: "Correios",
    service: "PAC",
    price: 18.9,
    deadlineDays: 8,
  },
  {
    carrier: "Correios",
    service: "SEDEX",
    price: 32.5,
    deadlineDays: 3,
  },
  {
    carrier: "Jadlog",
    service: "Expresso",
    price: 25.0,
    deadlineDays: 5,
  },
];
