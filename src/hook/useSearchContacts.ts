import { useQuery } from "@tanstack/react-query";
import apiCall from "../utils/apiCall";

export default function useSearchContacts<T>(
  query: string,
  {
    enabled = false,
    isSubmitted = false,
    key = 'default'
  }: { enabled?: boolean; isSubmitted?: boolean, key?: string}
) {
  const searchQuery = isSubmitted ? query : null;

  return useQuery<T>({
    queryKey: [key, searchQuery],
    queryFn: () =>
      apiCall("comments", {
        query: {
          q: query,
        },
      }),
    enabled,
  });
}
