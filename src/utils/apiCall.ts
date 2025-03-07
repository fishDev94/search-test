import {
  ofetch,
  type FetchRequest,
  type FetchResponse,
  type FetchOptions,
} from "ofetch";

const baseUrl = import.meta.env.VITE_BASE_URL;

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
