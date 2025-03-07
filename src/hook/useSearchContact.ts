import { useQuery } from "@tanstack/react-query";
import apiCall from "../utils/apiCall";

export default function useSearchContacts<T>(query: string, isSubmitted: boolean = false) {
    const searchQuery = isSubmitted ? query : null;

    return useQuery<T>({
        queryKey: ["comments", searchQuery],
        queryFn: () => apiCall("comments", {
          query: {
            q: query,
          },
        }),
      });
}