import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddressForm } from "../components/address-form";
import type { AddressFormValues } from "../components/address-form/schema";

type CreateAddressContainerProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AddressFormValues) => void;
  isSubmitting?: boolean;
};

export function CreateAddressContainer({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: CreateAddressContainerProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar endereço</DialogTitle>
          <DialogDescription className="sr-only">
            Preencha os dados do novo endereço
          </DialogDescription>
        </DialogHeader>
        <AddressForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
}
