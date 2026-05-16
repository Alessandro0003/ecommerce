import type { Address } from "../../schemas";

export type AddressListProps = {
  addresses: Address[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
};
