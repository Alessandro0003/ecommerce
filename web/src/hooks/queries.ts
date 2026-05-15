import {
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

interface CreateQueryArgs<ArgsT, ResponseT> {
  queryKey: QueryKey;
  queryFn: (args: ArgsT) => Promise<ResponseT>;
}

export const createQuery = <ArgsT, ResponseT>(
  { queryKey, queryFn }: CreateQueryArgs<ArgsT, ResponseT>,
  defaultOptions?: UseQueryOptions<ResponseT>,
) => {
  return function useCustomQuery(
    args: ArgsT,
    options?: UseQueryOptions<ResponseT>,
  ): UseQueryResult<ResponseT> {
    return useQuery({
      queryKey: [...queryKey, args],
      queryFn: () => queryFn(args),
      ...defaultOptions,
      ...options,
    });
  };
};
