import type { Product } from "@/modules/product";

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Ração Premium para Cães Adultos 15kg",
    description:
      "Alimento completo e balanceado para cães adultos de porte médio e grande. Fórmula com frango e arroz, enriquecida com ômega-3 e ômega-6 para pelagem brilhante e saúde articular.",
    category: "DOG",
    price: 189.9,
    promotionalPrice: 159.9,
    stock: 23,
    weight: 15000,
    dimensions: { width: 40, height: 60, length: 15 },
    images: [
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80",
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-2",
    name: "Areia Higiênica para Gatos 4kg",
    description:
      "Areia sanitária aglomerante com alto poder de absorção e controle de odores por até 30 dias. Granulometria fina, baixo nível de poeira e fácil limpeza.",
    category: "CAT",
    price: 34.9,
    stock: 87,
    weight: 4000,
    dimensions: { width: 20, height: 30, length: 10 },
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-3",
    name: "Brinquedo Mordedor de Borracha Natural",
    description:
      "Mordedor resistente em borracha natural vulcanizada, ideal para cães de médio e grande porte. Estimula a limpeza dos dentes e entretém por horas.",
    category: "DOG",
    price: 42.9,
    promotionalPrice: 32.9,
    stock: 54,
    weight: 300,
    dimensions: { width: 15, height: 8, length: 8 },
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-4",
    name: "Coleira Retrátil 5m para Cães até 30kg",
    description:
      "Coleira extensível com cabo de nylon resistente de 5 metros, travas de segurança e punho ergonômico antiderrapante. Compatível com cães de até 30 kg.",
    category: "DOG",
    price: 89.9,
    stock: 31,
    weight: 350,
    dimensions: { width: 12, height: 12, length: 6 },
    images: [
      "https://images.unsplash.com/photo-1601758066709-8be5cce6f2d1?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-5",
    name: "Comedouro Inox Duplo Antiderrapante",
    description:
      "Conjunto de dois potes em aço inoxidável cirúrgico com suporte de madeira e base antiderrapante de silicone. Fácil de lavar e higienizar. Capacidade total: 2 × 500 ml.",
    category: "DOG",
    price: 67.9,
    stock: 42,
    weight: 650,
    dimensions: { width: 35, height: 12, length: 18 },
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-6",
    name: "Casinha para Cães de Porte Médio",
    description:
      "Casinha em madeira pinus tratada com telhado removível para fácil limpeza. Dimensões internas: 60 × 50 cm. Resistente à chuva e ao sol com verniz impermeabilizante.",
    category: "DOG",
    price: 459.9,
    promotionalPrice: 389.9,
    stock: 8,
    weight: 7500,
    dimensions: { width: 70, height: 65, length: 60 },
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-7",
    name: "Aquário 30L com Kit Completo",
    description:
      "Aquário de vidro flotado 5mm com capacidade de 30 litros. Inclui filtro externo, aquecedor 50W, termômetro digital, bomba de ar, iluminação LED branca/azul e tampa.",
    category: "FISH",
    price: 299.9,
    stock: 12,
    weight: 8000,
    dimensions: { width: 50, height: 35, length: 30 },
    images: [
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-8",
    name: "Ração para Peixes Tropicais 100g",
    description:
      "Flocos nutritivos para peixes tropicais de água doce com alta concentração de proteínas, vitaminas e minerais. Realça a coloração naturalmente. Embalagem zip-lock.",
    category: "FISH",
    price: 12.9,
    stock: 120,
    weight: 100,
    dimensions: { width: 8, height: 14, length: 4 },
    images: [
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-9",
    name: "Gaiola para Pássaros Canários Luxo",
    description:
      "Gaiola em aço galvanizado pintado com epóxi branco, espaço interno amplo (40 × 30 × 50 cm), 3 poleiros de madeira natural, bandeja removível e 2 comedouros de plástico.",
    category: "BIRD",
    price: 149.9,
    stock: 19,
    weight: 2200,
    dimensions: { width: 42, height: 55, length: 32 },
    images: [
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-10",
    name: "Shampoo Neutro para Cães 500ml",
    description:
      "Shampoo hipoalergênico com pH neutro, formulado especialmente para a pele e pelo dos cães. Sem parabenos, sem sulfatos. Fragrância suave de lavanda. Indicado para uso frequente.",
    category: "DOG",
    price: 28.9,
    stock: 63,
    weight: 550,
    dimensions: { width: 7, height: 22, length: 7 },
    images: [
      "https://images.unsplash.com/photo-1612160609504-334df7826195?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-11",
    name: "Petisco Bifinho de Carne Bovina 500g",
    description:
      "Petisco crocante em tiras de carne bovina desidratada, rico em proteínas. Sem corantes artificiais. Ideal como recompensa no adestramento ou para fortalecer o vínculo com seu pet.",
    category: "DOG",
    price: 24.9,
    promotionalPrice: 19.9,
    stock: 98,
    weight: 500,
    dimensions: { width: 15, height: 25, length: 5 },
    images: [
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80",
    ],
    active: true,
  },
  {
    id: "prod-12",
    name: "Tapete Higiênico para Cães 60×60cm (30 un)",
    description:
      "Tapete descartável com 5 camadas de proteção: camada superior macia, absorção rápida, camada impermeável de polietileno e base antiderrapante. Controla odores com tecnologia de gel.",
    category: "DOG",
    price: 49.9,
    stock: 74,
    weight: 900,
    dimensions: { width: 62, height: 5, length: 62 },
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    ],
    active: true,
  },
];

export const mockCategories = [
  { value: "DOG", label: "Cães" },
  { value: "CAT", label: "Gatos" },
  { value: "BIRD", label: "Aves" },
  { value: "FISH", label: "Peixes" },
  { value: "OTHER", label: "Outros" },
] as const;
