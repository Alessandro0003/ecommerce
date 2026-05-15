import type { Address } from "@/modules/address";

export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    zipCode: "01310100",
    street: "Avenida Paulista",
    number: "1578",
    complement: "Apto 42",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    isDefault: true,
  },
  {
    id: "addr-2",
    zipCode: "22041011",
    street: "Rua Visconde de Pirajá",
    number: "351",
    complement: "Bloco B, Sala 205",
    neighborhood: "Ipanema",
    city: "Rio de Janeiro",
    state: "RJ",
    isDefault: false,
  },
  {
    id: "addr-3",
    zipCode: "30112010",
    street: "Avenida Afonso Pena",
    number: "600",
    neighborhood: "Centro",
    city: "Belo Horizonte",
    state: "MG",
    isDefault: false,
  },
];
