import {
  ofetch,
  type FetchRequest,
  type FetchResponse,
  type FetchOptions,
} from "ofetch";

const baseUrl = import.meta.env.VITE_BASE_URL;

/**
 * Makes an API call using `ofetch` with optional success and error handlers.
 *
 * @template T - The expected response data type.
 * @template R - The type of the request payload (defaults to `FetchRequest`).
 * @param {string} endpoint - The API endpoint to call.
 * @param {Object} [options] - Optional configuration for the API call.
 * @param {(arg: T) => void} [options.onSuccess] - Callback function to handle successful responses.
 * @param {() => void} [options.onError] - Callback function to handle errors.
 * @param {FetchOptions<"json", R>} [options] - Additional fetch options (e.g., headers, method, body).
 * @returns {Promise<T>} - A promise resolving to the response data of type `T`.
 *
 * @throws Will throw an error if the API call fails.
 *
 * @example
 * // Example usage with success and error handlers
 * apiCall<MyResponseType>("data", {
 *   onSuccess: (data) => console.log("Success:", data),
 *   onError: () => console.error("Error fetching data"),
 * });
 */
const apiCall = async <T, R extends FetchRequest = FetchRequest>(
  endpoint: string,
  options?: {
    onSuccess?: (arg: T) => void;
    onError?: () => void;
  } & FetchOptions<"json", R>
) => {
  return await ofetch<T>(endpoint, {
    ...options,
    baseURL: options?.baseURL || baseUrl,
    headers: {
      ...options?.headers,
      "Accept-Encoding": "gzip, compress, br",
    },
    onResponse({ response }: { response: FetchResponse<T> }) {
      if (options?.onSuccess) {
        options.onSuccess(response._data!);
      }
    },
    onResponseError() {
      if (options?.onError) {
        options.onError();
      }
      throw new Error("Error fetching");
    },
  });
};

export default apiCall;
