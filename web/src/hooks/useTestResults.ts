/**
 * TODO: TanStack Query hooks
 * - useTestResults(): fetch /api/test-results (loading/error, select, staleTime)
 * - useUpdateTestStatus(): optimistic updates + rollback + reconciliation
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

// API: fetch test results
const fetchTestResults = async (): Promise<TestResult[]> => {
  const response = await fetch('/api/test-results');
  if (!response.ok) throw new Error('Failed to fetch test results');
  return response.json();
};

// API: update test result status
const updateTestStatus = async (id: string, status: TestResult['status']) => {
  const response = await fetch(`/api/test-results/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update test status');
  return response.json();
};

// Hook: fetch test results
export function useTestResults() {
  return useQuery({
    queryKey: ['test-results'],
    queryFn: fetchTestResults,
    staleTime: 30_000, 
    refetchOnWindowFocus: false,
    select: (data) =>
      data.map((item) => ({
        ...item,
        displayName: `${item.name} (#${item.id})`,
      })),
  });
}

// Hook: update test status
export function useUpdateTestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TestResult['status'] }) =>
      updateTestStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['test-results'] });
      const previousData = queryClient.getQueryData<TestResult[]>(['test-results']);

      queryClient.setQueryData<TestResult[]>(['test-results'], (oldData) =>
        oldData?.map((item) =>
          item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item
        ) ?? []
      );

      return { previousData };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['test-results'], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['test-results'] });
    },
  });
}
