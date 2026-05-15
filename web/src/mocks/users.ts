import type { User } from "@/modules/user";

export const mockCurrentUser: User = {
  id: "user-1",
  name: "João da Silva",
  email: "joao@email.com",
  phone: "11999999999",
  cpf: "12345678900",
  role: "USER",
  createdAt: "2025-12-10T08:00:00.000Z",
};

export const mockAdminUser: User = {
  id: "admin-1",
  name: "Admin Principal",
  email: "admin@petshop.com",
  phone: "11988880000",
  cpf: "98765432100",
  role: "ADMIN",
  createdAt: "2025-10-01T08:00:00.000Z",
};

export const mockUsers: User[] = [
  mockCurrentUser,
  mockAdminUser,
  {
    id: "user-2",
    name: "Maria Oliveira",
    email: "maria.oliveira@gmail.com",
    phone: "21987654321",
    cpf: "23456789011",
    role: "USER",
    createdAt: "2026-01-15T10:30:00.000Z",
  },
  {
    id: "user-3",
    name: "Carlos Souza",
    email: "carlos.souza@hotmail.com",
    phone: "31976543210",
    cpf: "34567890122",
    role: "USER",
    createdAt: "2026-02-20T14:00:00.000Z",
  },
  {
    id: "user-4",
    name: "Ana Beatriz Costa",
    email: "ana.costa@yahoo.com.br",
    phone: "41965432109",
    cpf: "45678901233",
    role: "USER",
    createdAt: "2026-03-05T09:15:00.000Z",
  },
  {
    id: "user-5",
    name: "Roberto Ferreira",
    email: "roberto.ferreira@gmail.com",
    phone: "51954321098",
    cpf: "56789012344",
    role: "USER",
    createdAt: "2026-04-18T16:45:00.000Z",
  },
];
