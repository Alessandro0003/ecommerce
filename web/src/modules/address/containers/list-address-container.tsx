import { useState } from "react";
import { toast } from "sonner";
import { AddressList } from "../components/address-list";
import { AddressListSkeleton } from "../components/address-list-skeleton";
import { CreateAddressContainer } from "./create-address-container";
import { UpdateAddressContainer } from "./update-address-container";
import { DeleteAddressContainer } from "./delete-address-container";
import type { AddressFormValues } from "../components/address-form/schema";
import type { Address } from "../schemas";

type ListAddressContainerProps = {
  addresses: Address[];
  isLoading?: boolean;
  onCreate: (values: AddressFormValues) => void;
  onUpdate: (id: string, values: AddressFormValues) => void;
  onDelete: (id: string) => void;
};

export function ListAddressContainer({
  addresses,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
}: ListAddressContainerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);

  if (isLoading) return <AddressListSkeleton />;

  function handleEditRequest(id: string) {
    setEditingAddress(addresses.find((a) => a.id === id) ?? null);
  }

  function handleDeleteRequest(id: string) {
    setDeletingAddress(addresses.find((a) => a.id === id) ?? null);
  }

  function handleCreate(values: AddressFormValues) {
    onCreate(values);
    setIsCreateOpen(false);
    toast.success("Endereço adicionado!");
  }

  function handleUpdate(id: string, values: AddressFormValues) {
    onUpdate(id, values);
    setEditingAddress(null);
    toast.success("Endereço atualizado!");
  }

  function handleDelete(id: string) {
    onDelete(id);
    setDeletingAddress(null);
    toast.success("Endereço removido.");
  }

  return (
    <>
      <AddressList
        addresses={addresses}
        onEdit={handleEditRequest}
        onDelete={handleDeleteRequest}
        onAdd={() => setIsCreateOpen(true)}
      />

      <CreateAddressContainer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
      />

      <UpdateAddressContainer
        address={editingAddress}
        onClose={() => setEditingAddress(null)}
        onSubmit={handleUpdate}
      />

      <DeleteAddressContainer
        address={deletingAddress}
        onClose={() => setDeletingAddress(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
