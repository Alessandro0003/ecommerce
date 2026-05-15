import {
  type InvalidateQueryFilters,
  type MutationFunction,
  type MutationKey,
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAlert } from "./use-alerts";

interface CreateMutationArgs<TData, TVariables> {
  key: MutationKey;
  mutationFn: MutationFunction<TData, TVariables>;
  messages?: {
    onError?: () => string;
    onMutate?: () => string;
    onSuccess?: () => string;
  };
  invalidate?: InvalidateQueryFilters[];
}

export const createMutation = <TData, TVariables = void>(
  args: CreateMutationArgs<TData, TVariables>,
) => {
  const { key, mutationFn, messages, invalidate } = args;

  return (
    options?: Omit<
      UseMutationOptions<TData, unknown, TVariables, unknown>,
      "mutationFn"
    >,
  ) => {
    const { onError, onSuccess, onMutate, ...config } = options || {};
    const { Alert } = useAlert();

    const queryClient = useQueryClient();

    const handleInvalidate = () => {
      invalidate?.forEach((query) => {
        queryClient.invalidateQueries(query);
      });
    };

    return useMutation({
      mutationKey: key,
      mutationFn,
      onError: (error, variables, onMutateResult, context) => {
        onError?.(error, variables, onMutateResult, context);

        if (messages?.onError) {
          Alert({ variant: "error", message: messages.onError() });
        }
      },
      onMutate: (variables, context) => {
        onMutate?.(variables, context);

        if (messages?.onMutate) {
          Alert({ variant: "info", message: messages.onMutate() });
        }
      },
      onSuccess: (data, variables, onMutateResult, context) => {
        onSuccess?.(data, variables, onMutateResult, context);

        handleInvalidate();

        if (messages?.onSuccess) {
          Alert({ variant: "success", message: messages.onSuccess() });
        }
      },

      ...config,
    });
  };
};
