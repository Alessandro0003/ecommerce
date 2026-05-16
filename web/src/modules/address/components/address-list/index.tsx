import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressCard } from "../address-card";
import type { AddressListProps } from "./types";

export function AddressList({ addresses, onEdit, onDelete, onAdd }: AddressListProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {addresses.length}{" "}
          {addresses.length === 1 ? "endereço cadastrado" : "endereços cadastrados"}
        </p>
        <Button size="sm" onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar endereço
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-lg border border-dashed py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum endereço cadastrado.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
