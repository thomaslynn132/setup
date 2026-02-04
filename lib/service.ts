import {
   useQuery,
   useMutation,
   useInfiniteQuery,
   useQueryClient,
} from '@tanstack/react-query';
import { api } from './axios';

/* -------------------- helpers -------------------- */

const getHeaders = (payload?: any) =>
   payload instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };

/* ==================== GET LIST ==================== */

export function useGetList<TResponse = any>({
   endpoint,
   enabled = true,
}: {
   endpoint: string;
   enabled?: boolean;
}) {
   return useQuery({
      queryKey: [endpoint],
      enabled,
      queryFn: async () => {
         const res = await api.get<TResponse>(endpoint);
         return res;
      },
   });
}

/* ==================== GET BY ID ==================== */

export function useGetById<TResponse = any>({
   endpoint,
   id,
   enabled = true,
}: {
   endpoint: string;
   id?: string | number;
   enabled?: boolean;
}) {
   return useQuery({
      queryKey: [endpoint, id],
      enabled: enabled && !!id,
      queryFn: async () => {
         if (!id) throw new Error('No ID provided');
         const res = await api.get<TResponse>(`${endpoint}/${id}`);
         return res;
      },
   });
}

/* ==================== CREATE ==================== */

export function useCreate<TPayload = any, TResponse = any>({
   endpoint,
   onSuccess,
   onError,
}: {
   endpoint: string;
   onSuccess?: () => void;
   onError?: (error: any) => void;
}) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (payload: TPayload) => {
         const res = await api.post<TResponse>(endpoint, payload, {
            headers: getHeaders(payload),
         });
         return res.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [endpoint] });
         onSuccess?.();
      },
      onError,
   });
}

/* ==================== UPDATE (PUT / PATCH) ==================== */

export function useUpdate<TPayload = any, TResponse = any>({
   endpoint,
   method = 'put',
   onSuccess,
   onError,
}: {
   endpoint: string;
   method?: 'put' | 'patch';
   onSuccess?: () => void;
   onError?: (error: any) => void;
}) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         id,
         payload,
      }: {
         id: string | number;
         payload: TPayload;
      }) => {
         const res = await api[method]<TResponse>(
            `${endpoint}/${id}`,
            payload,
            { headers: getHeaders(payload) },
         );
         return res.data;
      },
      onSuccess: (_, { id }) => {
         queryClient.invalidateQueries({ queryKey: [endpoint] });
         queryClient.invalidateQueries({ queryKey: [endpoint, id] });
         onSuccess?.();
      },
      onError,
   });
}

/* ==================== DELETE ==================== */

export function useDelete({
   endpoint,
   onSuccess,
   onError,
}: {
   endpoint: string;
   onSuccess?: () => void;
   onError?: (error: any) => void;
}) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (id: string | number) => {
         const res = await api.delete(`${endpoint}/${id}`);
         return res.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [endpoint] });
         onSuccess?.();
      },
      onError,
   });
}

/* ==================== INFINITE LIST ==================== */

export function useInfiniteList<TResponse = any>(endpoint: string) {
   return useInfiniteQuery({
      queryKey: [endpoint, 'infinite'],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
         const res = await api.get<TResponse>(endpoint, {
            params: { page: pageParam },
         });
         return res.data;
      },
      getNextPageParam: (last: any) => last?.nextPage,
   });
}
