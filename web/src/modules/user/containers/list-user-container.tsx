import { Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/layout/empty-state";
import { ErrorState } from "@/components/layout/error-state";
import { UserRow } from "../components/user-row";
import { UserTableSkeleton } from "../components/user-table-skeleton";
import type { User } from "../schemas";

type ListUserContainerProps = {
  users: User[];
  isLoading?: boolean;
  isError?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ListUserContainer({
  users,
  isLoading,
  isError,
  onEdit,
  onDelete,
}: ListUserContainerProps) {
  if (isLoading) return <UserTableSkeleton />;
  if (isError)
    return <ErrorState message="Não foi possível carregar os usuários." />;
  if (users.length === 0)
    return (
      <EmptyState
        icon={Users}
        title="Nenhum usuário encontrado"
        description="Os usuários cadastrados aparecerão aqui."
      />
    );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Papel</TableHead>
            <TableHead>Cadastrado em</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
