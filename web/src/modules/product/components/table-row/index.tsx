import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import type { Product } from "../../schemas";

const CATEGORY_LABELS: Record<string, string> = {
  DOG: "Cães",
  CAT: "Gatos",
  BIRD: "Aves",
  FISH: "Peixes",
  OTHER: "Outros",
};

type ProductTableRowProps = {
  product: Product;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ProductTableRow({ product, onEdit, onDelete }: ProductTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-10 w-10 rounded object-cover"
        />
      </TableCell>

      <TableCell className="max-w-[200px] font-medium">
        <p className="line-clamp-2 text-sm">{product.name}</p>
      </TableCell>

      <TableCell>
        <Badge variant="secondary">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </Badge>
      </TableCell>

      <TableCell>
        {product.promotionalPrice ? (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-accent">
              {formatCurrency(product.promotionalPrice)}
            </span>
            <span className="text-xs line-through text-muted-foreground">
              {formatCurrency(product.price)}
            </span>
          </div>
        ) : (
          <span className="text-sm font-bold">
            {formatCurrency(product.price)}
          </span>
        )}
      </TableCell>

      <TableCell>
        <span
          className={
            product.stock > 0 ? "text-success font-medium" : "text-destructive font-medium"
          }
        >
          {product.stock}
        </span>
      </TableCell>

      <TableCell>
        <Badge variant={product.active ? "default" : "secondary"}>
          {product.active ? "Ativo" : "Inativo"}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => onEdit?.(product.id)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete?.(product.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
