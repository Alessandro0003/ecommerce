import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Address } from "../schemas";

type DeleteAddressContainerProps = {
  address: Address | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
};

export function DeleteAddressContainer({
  address,
  onClose,
  onConfirm,
}: DeleteAddressContainerProps) {
  return (
    <AlertDialog open={address !== null} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover endereço</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover o endereço{" "}
            <strong className="text-foreground">
              {address?.street}, {address?.number}
            </strong>
            ? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => address && onConfirm(address.id)}
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
