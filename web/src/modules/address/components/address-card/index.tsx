import { MapPin, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCEP } from "@/lib/format";
import type { AddressCardProps } from "./types";

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  const line1 = `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ""}`;
  const line2 = `${address.neighborhood} — ${address.city}/${address.state}, ${formatCEP(address.zipCode)}`;

  return (
    <Card className={address.isDefault ? "border-primary" : undefined}>
      <CardContent className="pb-2 pt-4">
        {address.isDefault && (
          <Badge className="mb-2 text-xs">Padrão</Badge>
        )}
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{line1}</p>
            <p className="text-sm text-muted-foreground">{line2}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-1 pb-3 pt-0">
        <Button variant="ghost" size="sm" onClick={() => onEdit(address.id)}>
          <Pencil className="mr-1.5 h-3 w-3" />
          Editar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(address.id)}
        >
          <Trash2 className="mr-1.5 h-3 w-3" />
          Remover
        </Button>
      </CardFooter>
    </Card>
  );
}
