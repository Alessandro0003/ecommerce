import { FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "@/components/layout/empty-state";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function NotFoundPage() {
  useDocumentTitle("Página não encontrada");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <EmptyState
        icon={FileQuestion}
        title="Página não encontrada"
        description="O endereço que você acessou não existe ou foi removido."
        actionLabel="Voltar para a home"
        onAction={() => navigate("/")}
      />
    </div>
  );
}
