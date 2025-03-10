import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useSearchComments from '../useSearchComments';
import apiCall from '../../utils/apiCall';

vi.mock('../../utils/apiCall', () => ({
  default: vi.fn(() => Promise.resolve({ data: 'mocked data' })),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useSearchComments', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not call the API if enabled is false', async () => {
    const { result } = renderHook(
      () => useSearchComments('test', { enabled: false }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });

  it('should call the API if enabled is true and return data', async () => {
    const { result } = renderHook(
      () => useSearchComments('test', { enabled: true }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual({ data: 'mocked data' });
    });
  });

  it('should use the correct query key', async () => {
    const { result } = renderHook(
      () => useSearchComments('test', { enabled: true, key: 'customKey' }),
      { wrapper: createWrapper() }
    );
  
    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });
  
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual({ data: 'mocked data' });
    });

    expect(apiCall).toHaveBeenCalledWith('comments', {
      query: {
        q: 'test',
      },
    });
  });

  it('should not call the API if isSubmitted is false and enabled too', async () => {
    const { result } = renderHook(
      () => useSearchComments('test', { enabled: false, isSubmitted: false }),
      { wrapper: createWrapper() }
    );
  
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  
    expect(apiCall).not.toHaveBeenCalled();
  });

  it('should call the API if isSubmitted is true', async () => {
    const { result } = renderHook(
      () => useSearchComments('test', { enabled: true, isSubmitted: true }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual({ data: 'mocked data' });
    });
  });
});