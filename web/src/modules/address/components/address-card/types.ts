import type { Address } from "../../schemas";

export type AddressCardProps = {
  address: Address;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};
