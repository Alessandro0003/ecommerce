# E-commerce Microservices

Sistema de e-commerce para produtos pet desenvolvido com arquitetura de microserviços. Cada serviço é independente, responsável por uma fatia do negócio, e se comunica via HTTP (síncrono) ou RabbitMQ (assíncrono).

## Arquitetura

```
                        ┌─────────────┐
                        │  Web (React) │
                        └──────┬──────┘
                               │ HTTP
                        ┌──────▼──────┐
                        │ API Gateway  │  ← autenticação, roteamento, resiliência
                        └──────┬──────┘
               ┌───────────────┼───────────────┐
               │               │               │
        ┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
        │  Checkout   │ │  Payments   │ │  (outros)  │
        │  Service    │ │  Service    │ │            │
        └──────┬──────┘ └──────▲──────┘ └────────────┘
               │               │
               └───────────────┘
                   RabbitMQ
```

## Serviços

### API Gateway — `api-gateway/`

Ponto de entrada único da aplicação. Gerencia autenticação, roteamento e resiliência.

| Aspecto       | Detalhe                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| Framework     | NestJS + TypeScript                                                     |
| Autenticação  | JWT + Passport (login e registro próprios)                              |
| Rate limiting | 3 níveis: 10/seg · 100/min · 1000/15min                                 |
| Resiliência   | Circuit Breaker, Retry automático, Timeout, Fallback com cache          |
| Documentação  | Swagger em `/docs`                                                      |

**Endpoints expostos:**
- `POST /auth/login` — autenticação (rate limit: 5/min)
- `POST /auth/register` — registro (rate limit: 3/min)
- `*` — proxy para os demais microsserviços com guards de autenticação e roles

---

### Checkout Service — `checkout-service/`

Responsável por receber e enfileirar pedidos de checkout para processamento assíncrono.

| Aspecto     | Detalhe                               |
| ----------- | ------------------------------------- |
| Framework   | NestJS + TypeScript                   |
| Banco       | PostgreSQL (TypeORM)                  |
| Mensageria  | RabbitMQ — publica eventos de pedido  |

**Fluxo:** O front envia o pedido → checkout-service valida e publica na fila → payments-service consome e processa.

---

### Payments Service — `payments-service/`

Responsável por consumir eventos de pagamento da fila e processar as transações.

| Aspecto     | Detalhe                                  |
| ----------- | ---------------------------------------- |
| Framework   | NestJS + TypeScript                      |
| Banco       | PostgreSQL (TypeORM)                     |
| Mensageria  | RabbitMQ — consome eventos de pagamento  |

**DLQ implementada:** mensagens rejeitadas são redirecionadas para a Dead Letter Queue para reprocessamento.

---

### Messaging Service — `messaging-service/`

Centraliza a infraestrutura de mensageria assíncrona da aplicação.

| Aspecto       | Detalhe                        |
| ------------- | ------------------------------ |
| Infraestrutura | RabbitMQ 3 (via Docker Compose) |
| Management UI  | `http://localhost:15672`       |
| Credenciais    | `admin` / `admin`              |

Sobe o broker RabbitMQ que é compartilhado por checkout-service e payments-service.

---

### Web — `web/`

Front-end completo com arquitetura modular por entidade de negócio.

| Aspecto      | Detalhe                                   |
| ------------ | ----------------------------------------- |
| Framework    | React 19 + Vite + TypeScript              |
| UI           | shadcn/ui + TailwindCSS v3                |
| Roteamento   | React Router v7                           |
| Formulários  | React Hook Form + Zod                     |
| Estado       | Context API + TanStack Query + Axios      |
| Tema         | Dark/Light mode com next-themes           |

**Módulos:** auth, user, address, product, cart, checkout, order, payment, promotion, shipping.

Veja [web/Readme.md](web/Readme.md) para documentação detalhada do front-end.

---

## Tecnologias

- **NestJS** — framework principal dos microsserviços
- **React 19 + Vite** — front-end
- **TypeScript** — em toda a stack
- **PostgreSQL** — banco relacional (checkout e payments)
- **RabbitMQ** — mensageria assíncrona entre serviços
- **shadcn/ui + TailwindCSS** — design system do front-end
- **JWT** — autenticação stateless
- **Docker Compose** — infraestrutura local (RabbitMQ)

---

## Como Executar

### Pré-requisitos

- Node.js 20+
- Docker (para RabbitMQ e PostgreSQL)

### 1. Subir a infraestrutura

```bash
# Sobe RabbitMQ
cd messaging-service
docker compose up -d
```

### 2. Subir os serviços (cada um em um terminal)

```bash
# API Gateway (porta 3000)
cd api-gateway
npm install
npm run start:dev

# Checkout Service (porta 3007)
cd checkout-service
npm install
npm run start:dev

# Payments Service (porta 3008)
cd payments-service
npm install
npm run start:dev
```

### 3. Subir o front-end

```bash
cd web
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## Documentação

- Swagger do API Gateway: `http://localhost:3000/docs`
- RabbitMQ Management: `http://localhost:15672`
- Detalhes do front-end: [web/Readme.md](web/Readme.md)
