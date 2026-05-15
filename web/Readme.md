# 🐾 PetShop E-commerce — Instructions

Documentação de construção do front-end do e-commerce de produtos para pets, dividida em duas fases.

---

## 📂 Estrutura desta documentação

| Documento               | Status        | Escopo                                                                                                                                         |
| ----------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **CLAUDE.md** (Parte 1) | ✅ Disponível | Construir todo o **layout visual** com dados mockados. Arquitetura modular completa, mas **sem** integração com back-end.                      |
| **CLAUDE.md** (Parte 2) | ⏳ A criar    | Substituir mocks por chamadas reais aos microsserviços. Será criada quando todos os serviços estiverem prontos (incluindo `products-service`). |

---

## 📍 Onde colocar a instruction

O arquivo **`CLAUDE.md`** deve ser salvo na raiz do projeto front-end:

```
ecommerce/
├── api-gateway/
├── checkout-service/
├── messaging-service/
├── payments-service/
└── web/
    ├── CLAUDE.md          ← instruction aqui
    ├── package.json
    └── src/
```

O Claude Code lê automaticamente esse arquivo como contexto persistente.

---

## 🎯 Por que duas partes?

1. **Front evolui em paralelo** com o back-end sem ficar bloqueado.
2. **Validação visual com stakeholders** antes de gastar tempo com integração.
3. **Containers já são a "porta de entrada" da integração** — quando o back ficar pronto, a transição é mínima:
   - Containers param de receber props
   - Passam a chamar hooks reais (`useGetProducts`, `useCreateUser`, etc.)
   - **Zero refactor no JSX dos componentes**
4. **Arquitetura modular se mantém intacta** desde o dia 1.

---

## 🚦 Quando partir para a Parte 2?

Após validar todos os critérios de "pronto" da Parte 1 (seção 12 do `PART-1-VISUAL-LAYOUT.md`):

- [ ] Todas as rotas navegáveis
- [ ] Formulários validando com Zod
- [ ] Dark/light funcionando em todas as páginas
- [ ] Carrinho client-side funcional (localStorage)
- [ ] Mobile testado
- [ ] Containers recebendo dados via props (não importando mocks)

E quando os serviços de back-end estiverem prontos:

- [ ] `users-service` (porta 3005)
- [ ] `products-service` (porta 3006) ← **a ser criado**
- [ ] `checkout-service` (porta 3007)
- [ ] `payments-service` (porta 3008)
- [ ] API Gateway (porta 3000)

---

## 📋 Stack consolidada

| Categoria                    | Tecnologia                          |
| ---------------------------- | ----------------------------------- |
| Build                        | Vite + React 18 + TypeScript        |
| Estilização                  | TailwindCSS + shadcn/ui             |
| Tema                         | next-themes (dark/light com toggle) |
| Roteamento                   | React Router v6+                    |
| Formulários                  | React Hook Form + Zod               |
| Ícones                       | Lucide React                        |
| Toasts                       | Sonner                              |
| Estado server-side (Parte 2) | TanStack Query                      |
| HTTP (Parte 2)               | Axios                               |

---

## 🎨 Direção visual

**Profissional / E-commerce corporativo** — inspiração em Amazon, Mercado Livre, Magazine Luiza.

- Foco em conversão, não em estética lúdica.
- Hierarquia visual clara (produtos em destaque, CTA óbvio).
- Densidade de informação alta nos cards.
- Cores acentuadas com parcimônia (azul corporativo + laranja CTA + verde sucesso).

---

## 🏛️ Arquitetura modular (resumo)

Cada entidade do back-end é um **módulo auto-contido** em `src/modules/`:

```
modules/<entidade>/
├── components/      # Visual puro (sem regra de negócio)
├── containers/      # Cola: na Parte 1 recebe props; na Parte 2 chama hooks
├── hooks/           # ⏸️ vazio na Parte 1; queries/mutations na Parte 2
├── services/        # ⏸️ vazio na Parte 1; HTTP na Parte 2
├── schemas/         # Zod + tipos (desde a Parte 1)
└── index.ts         # Barrel — único ponto de entrada
```

**Regra de ouro:** módulos só se comunicam pelos seus `index.ts`. Nada de importar arquivos internos de outro módulo.

---

## 📊 Mapa de módulos ↔ microsserviços

| Módulo Front | Serviço Back        | Particularidade                                          |
| ------------ | ------------------- | -------------------------------------------------------- |
| `auth`       | users-service       | `/auth/login`, `/auth/register` (rate limits agressivos) |
| `user`       | users-service       | `/users/me`, `/users/:id`                                |
| `address`    | users-service       | aninhado em users                                        |
| `product`    | products-service ⏳ | a criar no back                                          |
| `cart`       | —                   | **client-side**, persistido em localStorage              |
| `checkout`   | checkout-service    | **assíncrono** via RabbitMQ — front precisa de polling   |
| `order`      | checkout-service    | consulta status do pedido                                |
| `payment`    | payments-service    | consulta status (não dispara pagamento)                  |
| `promotion`  | products-service ⏳ | provavelmente junto de products                          |
| `shipping`   | checkout-service    | cálculo de frete pré-checkout                            |

---

## 🚀 Começando

Abra o arquivo `CLAUDE.md` no projeto `web/` e siga a ordem sugerida de implementação (seção 11).
