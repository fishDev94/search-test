import apiCall from "../apiCall";
import { cleanup } from '@testing-library/react'
import { ofetch } from "ofetch";

vi.mock("ofetch", () => ({
  ofetch: vi.fn(),
}));

describe("apiCall", () => {
  beforeEach(() => {
    cleanup();
  });

  it('should call the API and trigger onSuccess callback', async () => {
    const mockData = { message: 'Success' };
    vi.mocked(ofetch).mockImplementation(async (_, options) => {
      if (options.onResponse) {
        options.onResponse({ response: { _data: mockData } });
      }
      return mockData;
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await apiCall('test-endpoint', {
      onSuccess,
      onError,
    });

    expect(ofetch).toHaveBeenCalledWith('test-endpoint', {
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        'Accept-Encoding': 'gzip, compress, br',
      },
      onResponse: expect.any(Function),
      onResponseError: expect.any(Function),
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });

    expect(onSuccess).toHaveBeenCalledWith(mockData);
    expect(onError).not.toHaveBeenCalled();
  });

  it("should call the API and trigger onError callback on failure", async () => {
    vi.mocked(ofetch).mockImplementation(async (_, options) => {
      if (options.onResponseError) {
        options.onResponseError();
      }
      throw new Error("Error fetching");
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await expect(
      apiCall("test-endpoint", {
        onSuccess,
        onError,
      })
    ).rejects.toThrow("Error fetching");

    expect(onError).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("should use the provided baseURL", async () => {
    const mockData = { message: "Success" };
    vi.mocked(ofetch).mockResolvedValueOnce(mockData);

    const customBaseUrl = "https://custom-base-url.com";
    await apiCall("test-endpoint", {
      baseURL: customBaseUrl,
    });

    expect(ofetch).toHaveBeenCalledWith("test-endpoint", {
      baseURL: customBaseUrl,
      headers: {
        "Accept-Encoding": "gzip, compress, br",
      },
      onResponse: expect.any(Function),
      onResponseError: expect.any(Function),
    });
  });

  it("should use the default baseURL if not provided", async () => {
    const mockData = { message: "Success" };
    vi.mocked(ofetch).mockResolvedValueOnce(mockData);

    await apiCall("test-endpoint");

    expect(ofetch).toHaveBeenCalledWith("test-endpoint", {
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        "Accept-Encoding": "gzip, compress, br",
      },
      onResponse: expect.any(Function),
      onResponseError: expect.any(Function),
    });
  });

  it("should include custom headers if provided", async () => {
    const mockData = { message: "Success" };
    vi.mocked(ofetch).mockResolvedValueOnce(mockData);

    const customHeaders = {
      Authorization: "Bearer token",
    };

    await apiCall("test-endpoint", {
      headers: customHeaders,
    });

    expect(ofetch).toHaveBeenCalledWith("test-endpoint", {
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        "Accept-Encoding": "gzip, compress, br",
        ...customHeaders,
      },
      onResponse: expect.any(Function),
      onResponseError: expect.any(Function),
    });
  });

  it("should handle onResponse and onResponseError callbacks", async () => {
    const mockData = { message: "Success" };
    vi.mocked(ofetch).mockImplementation(async (_, options) => {
      if (options.onResponse) {
        options.onResponse({ response: { _data: mockData } });
      }
      return mockData;
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await apiCall("test-endpoint", {
      onSuccess,
      onError,
    });

    expect(onSuccess).toHaveBeenCalledWith(mockData);
    expect(onError).not.toHaveBeenCalled();

    vi.mocked(ofetch).mockImplementation(async (_, options) => {
      if (options.onResponseError) {
        options.onResponseError();
      }
      throw new Error("Error fetching");
    });

    await expect(
      apiCall("test-endpoint", {
        onSuccess,
        onError,
      })
    ).rejects.toThrow("Error fetching");

    expect(onError).toHaveBeenCalled();
  });
});
