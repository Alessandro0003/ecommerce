import { useSnackbar, type VariantType } from "notistack";
import { useCallback } from "react";

interface AlertArgs {
  variant: VariantType;
  message: string;
  hideDuration?: number;
  anchorOrigin?: {
    horizontal: "right" | "left" | "center";
    vertical: "top" | "bottom";
  };
}

export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const Alert = useCallback(
    (args: AlertArgs) => {
      const { variant, message, hideDuration, anchorOrigin } = args;

      enqueueSnackbar(message, {
        anchorOrigin: {
          horizontal: anchorOrigin ? anchorOrigin.horizontal : "right",
          vertical: anchorOrigin ? anchorOrigin.vertical : "bottom",
        },
        variant,
        autoHideDuration: hideDuration ?? 3000,
        preventDuplicate: true,
      });
    },
    [enqueueSnackbar],
  );

  return { Alert };
};
