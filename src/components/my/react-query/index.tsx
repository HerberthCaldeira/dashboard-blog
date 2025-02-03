import {
  QueryClient,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

interface UseMyMutateProps {
  mutationFn: (data: any) => Promise<any>;
  mutationOptions?: UseMutationOptions<any, any, any>;
  queryKeysToInvalidate?: any[][];
}

export const useMyMutate = ({
  mutationFn,
  mutationOptions,
  queryKeysToInvalidate,
}: UseMyMutateProps) => {
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (queryKeysToInvalidate) {
        queryKeysToInvalidate.forEach((key: Array<any>) => {
          console.log("key", key);
          queryClient.invalidateQueries(key);
        });
      }
      //formMethods.reset();
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error) => {
      console.log("useMyMutate::error", error);
    
    },
  });

  return {
    mutation,
  };
};
