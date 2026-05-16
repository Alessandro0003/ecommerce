import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddressForm } from "../components/address-form";
import type { AddressFormValues } from "../components/address-form/schema";
import type { Address } from "../schemas";

type UpdateAddressContainerProps = {
  address: Address | null;
  onClose: () => void;
  onSubmit: (id: string, values: AddressFormValues) => void;
  isSubmitting?: boolean;
};

export function UpdateAddressContainer({
  address,
  onClose,
  onSubmit,
  isSubmitting,
}: UpdateAddressContainerProps) {
  return (
    <Dialog open={address !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar endereço</DialogTitle>
          <DialogDescription className="sr-only">
            Atualize os dados do endereço
          </DialogDescription>
        </DialogHeader>
        {address && (
          <AddressForm
            defaultValues={address}
            onSubmit={(values) => onSubmit(address.id, values)}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
