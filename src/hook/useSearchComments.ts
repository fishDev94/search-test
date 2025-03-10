import { useQuery } from "@tanstack/react-query";
import apiCall from "../utils/apiCall";

/**
 * A custom React hook for searching comments using a query string.
 *
 * @template T - The type of data returned by the API.
 * @param {string} query - The search query string.
 * @param {Object} [options] - Optional configuration for the query.
 * @param {boolean} [options.enabled=false] - Whether the query is enabled (default: false).
 * @param {boolean} [options.isSubmitted=false] - Whether the search form has been submitted (default: false).
 * @param {string} [options.key="default"] - A unique key to identify the query (default: "default").
 * @returns {QueryResult<T>} - The result object from `useQuery`.
 *
 * @example
 * // Basic usage
 * const { data, isLoading, error } = useSearchComments<Comment[]>("comment", {
 *   enabled: true,
 *   isSubmitted: true,
 *   key: "search-bar",
 * });
 */
export default function useSearchComments<T>(
  query: string,
  {
    enabled = false,
    isSubmitted = false,
    key = "default",
  }: { enabled?: boolean; isSubmitted?: boolean; key?: string }
): ReturnType<typeof useQuery<T>> {
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
