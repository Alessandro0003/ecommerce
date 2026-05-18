# PetShop E-commerce — Web

Front-end do e-commerce de produtos para pets, construído com React + Vite e arquitetura modular por entidade de negócio.

---

## Stack

| Categoria       | Tecnologia                          |
| --------------- | ----------------------------------- |
| Build           | Vite + React 19 + TypeScript        |
| Estilização     | TailwindCSS v3 + shadcn/ui          |
| Tema            | next-themes (dark/light com toggle) |
| Roteamento      | React Router v7                     |
| Formulários     | React Hook Form + Zod               |
| Estado          | Context API (auth mock + cart real) |
| Server state    | TanStack Query + Axios              |
| Ícones          | Lucide React                        |
| Notificações    | Sonner                              |

---

## Arquitetura Modular

Cada entidade do back-end é um **módulo auto-contido** em `src/modules/`:

```
modules/<entidade>/
├── components/      # Componentes visuais puros (sem regra de negócio)
├── containers/      # Orquestração: compõe componentes e chama hooks
├── hooks/           # Queries e mutations (TanStack Query)
├── services/        # Chamadas HTTP (Axios)
├── schemas/         # Tipos e validações Zod
```

### Regra de importação entre camadas

| Camada        | Pode importar de          | NÃO pode importar de                       |
| ------------- | ------------------------- | ------------------------------------------ |
| `schemas/`    | nada do módulo            | components, containers                     |
| `components/` | `schemas/` (apenas tipos) | containers, hooks, services                |
| `containers/` | tudo do próprio módulo    | componentes internos de **outros** módulos |

---

## Módulos Implementados

| Módulo      | Responsabilidade                                                       |
| ----------- | ---------------------------------------------------------------------- |
| `auth`      | Formulários de login e registro                                        |
| `user`      | Perfil do usuário, listagem de usuários (admin)                        |
| `address`   | CRUD de endereços (card, form, listagem)                               |
| `product`   | Card, grid, filtros, form criar/editar, galeria, detalhe do produto    |
| `cart`      | Item com checkbox, resumo, estado vazio — client-side com localStorage |
| `checkout`  | Fluxo em 3 passos: endereço → frete → revisão                         |
| `order`     | Card de pedido, status badge, timeline, listagem                       |
| `payment`   | Badge de status, ícone de método (PIX, cartão)                         |
| `promotion` | Carrossel de banners, card de promoção, CRUD admin                     |
| `shipping`  | Calculadora de frete (CEP + opções)                                    |

---

## Mapa de Módulos ↔ Microsserviços

| Módulo Front | Serviço Back        | Particularidade                                          |
| ------------ | ------------------- | -------------------------------------------------------- |
| `auth`       | users-service       | `/auth/login`, `/auth/register` (rate limits agressivos) |
| `user`       | users-service       | `/users/me`, `/users/:id`                                |
| `address`    | users-service       | aninhado em users                                        |
| `product`    | products-service    | a criar no back-end                                      |
| `cart`       | —                   | **client-side**, persistido em localStorage              |
| `checkout`   | checkout-service    | **assíncrono** via RabbitMQ — front precisa de polling   |
| `order`      | checkout-service    | consulta status do pedido                                |
| `payment`    | payments-service    | consulta status (não dispara pagamento)                  |
| `promotion`  | products-service    | provavelmente junto de products                          |
| `shipping`   | checkout-service    | cálculo de frete pré-checkout                            |

---

## Páginas

**Públicas**
- `/` — Home com produtos em destaque e promoções
- `/produto/:id` — Detalhes do produto com galeria e frete
- `/login` — Formulário de login
- `/registro` — Formulário de registro

**Usuário autenticado**
- `/perfil` — Dados pessoais, endereços e segurança em tabs
- `/carrinho` — Itens selecionáveis, resumo lateral e total dinâmico
- `/checkout` — Stepper: endereço → frete → revisão final
- `/pedido/:id/aguardando` — Aguardo de processamento do pagamento
- `/pedidos` — Histórico de pedidos

**Admin**
- `/admin` — Dashboard com cards-resumo
- `/admin/produtos` — Tabela com filtros e busca
- `/admin/produtos/novo` — Formulário de criação
- `/admin/produtos/:id/editar` — Formulário de edição
- `/admin/promocoes` — CRUD de promoções

---

## Estrutura de Pastas

```
web/src/
├── components/
│   ├── ui/                      # Primitivos shadcn/ui
│   └── layout/                  # Header, Footer, AdminLayout, PublicLayout...
│
├── contexts/
│   ├── auth-context.tsx          # Auth mock para desenvolvimento
│   └── cart-context.tsx          # Cart real com localStorage
│
├── hooks/
│   ├── mutations.ts
│   ├── queries.ts
│   └── use-alerts.tsx
│
├── mocks/                        # Dados estáticos para desenvolvimento
│   ├── users.ts
│   ├── products.ts
│   ├── addresses.ts
│   ├── cart.ts
│   ├── orders.ts
│   ├── promotions.ts
│   └── shipping.ts
│
├── modules/                      # Módulos de negócio
│   ├── auth/
│   ├── user/
│   ├── address/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── order/
│   ├── payment/
│   ├── promotion/
│   └── shipping/
│
├── pages/
│   ├── public/
│   ├── user/
│   └── admin/
│
├── routes/
│   └── index.tsx
│
├── lib/
│   ├── utils.ts          # cn()
│   ├── format.ts         # formatCurrency, formatCEP, formatCPF, formatPhone
│   └── validators.ts     # Zod reutilizáveis
│
├── app.tsx
├── main.tsx
└── index.css
```

---

## Como Executar

```bash
# Instale as dependências
npm install

# Inicie em modo de desenvolvimento
npm run dev

# Build de produção
npm run build
```

A aplicação sobe em `http://localhost:5173` por padrão.

---

## Sistema de Design

Inspiração: Amazon, Mercado Livre, Magazine Luiza — foco em conversão.

- **Primário:** azul corporativo (`--primary: 221 83% 53%`)
- **CTA:** laranja (`--accent: 24 95% 53%`)
- **Sucesso:** verde para frete grátis / em estoque (`--success: 142 71% 45%`)
- **Tipografia:** Inter via Google Fonts
- **Dark/Light mode** com toggle no header
