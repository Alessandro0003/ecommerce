import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRow } from "../components/user-row";
import type { User } from "../schemas";

type ListUserContainerProps = {
  users: User[];
  isLoading?: boolean;
  isError?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-md" />
      ))}
    </div>
  );
}

export function ListUserContainer({
  users,
  isLoading,
  isError,
  onEdit,
  onDelete,
}: ListUserContainerProps) {
  if (isLoading) return <TableSkeleton />;
  if (isError)
    return (
      <p className="py-8 text-center text-sm text-destructive">
        Erro ao carregar usuários.
      </p>
    );
  if (users.length === 0)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Nenhum usuário encontrado.
      </p>
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
