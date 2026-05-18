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
import type { Promotion } from "../schemas";

type DeletePromotionContainerProps = {
  promotion: Promotion | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
};

export function DeletePromotionContainer({
  promotion,
  onClose,
  onConfirm,
}: DeletePromotionContainerProps) {
  return (
    <AlertDialog open={promotion !== null} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover promoção</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover a promoção{" "}
            <strong className="text-foreground">"{promotion?.title}"</strong>?
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => promotion && onConfirm(promotion.id)}
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
