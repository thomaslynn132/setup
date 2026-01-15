// hooks/useCrud.ts
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from './axios';

type CrudHookProps<TPayload = any> = {
  endpoint: string;
  payload?: TPayload;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export function useCrud<TResponse = any, TPayload = any>({
  endpoint,
  payload,
  onSuccess,
  onError,
}: CrudHookProps<TPayload>) {
  const queryClient = useQueryClient();

  const isFormData = (payload: any): payload is FormData =>
    typeof FormData !== 'undefined' && payload instanceof FormData;

  const headers = isFormData(payload)
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'application/json' };

  /* -------------------- GET QUERY -------------------- */
  const getQuery = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await api.get<TResponse>(endpoint);
      return res.data;
    },
  });
  // Usage: const { data, isLoading, error } = getQuery;

  /* -------------------- CREATE -------------------- */
  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post(endpoint, payload, { headers });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      onSuccess?.();
    },
    onError: (err) => {
      onError?.(err);
    },
  });
  // Usage: createMutation.mutate();

  /* -------------------- UPDATE -------------------- */
  const updateMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await api.put(`${endpoint}/${id}`, payload, { headers });
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      queryClient.invalidateQueries({ queryKey: [endpoint, id] });
      onSuccess?.();
    },
    onError: (err) => {
      onError?.(err);
    },
  });
  // Usage: updateMutation.mutate(id);

  /* -------------------- DELETE -------------------- */
  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await api.delete(`${endpoint}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      onSuccess?.();
    },
    onError: (err) => {
      onError?.(err);
    },
  });
  // Usage: deleteMutation.mutate(id);

  /* -------------------- INFINITE QUERY -------------------- */
  type InfiniteResponse<T> = {
    data: T[];
    nextPage?: number;
  };

  const infiniteQuery = useInfiniteQuery<InfiniteResponse<TResponse>, Error>({
    queryKey: [endpoint, 'infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<InfiniteResponse<TResponse>>(endpoint, {
        params: { page: pageParam },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });
  // Usage:
  // const { data, fetchNextPage, hasNextPage } = infiniteQuery;
  // const allItems = data?.pages.flatMap(page => page.data) ?? [];

  return {
    getQuery,
    infiniteQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}


// const MyComponent = () => {
//   const [newName, setNewName] = useState('');
//   const [editName, setEditName] = useState('');
//   const [editId, setEditId] = useState<number | null>(null);

//   const { getQuery, createMutation, updateMutation, deleteMutation, infiniteQuery } =
//     useCrud<{ id: number; name: string }, { name: string }>({
//       endpoint: '/users',
//     });

//   // GET ALL
//   const { data: users, isLoading, isError } = getQuery;

//   // INFINITE QUERY
//   const {
//     data: infiniteData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = infiniteQuery;
//   const allUsers = infiniteData?.pages.flatMap(page => page.data) ?? [];

//   // CREATE
//   const handleCreate = () => {
//     if (!newName.trim()) return;

//     createMutation.mutate(
//       { name: newName },
//       {
//         onSuccess: () => {
//           setNewName('');
//           alert('User created!');
//         },
//         onError: (err) => alert('Create failed: ' + err),
//       }
//     );
//   };

//   // UPDATE
//   const handleUpdate = (id: number) => {
//     if (!editName.trim()) return;

//     updateMutation.mutate(
//       { id, name: editName },
//       {
//         onSuccess: () => {
//           setEditId(null);
//           setEditName('');
//           alert('User updated!');
//         },
//         onError: (err) => alert('Update failed: ' + err),
//       }
//     );
//   };

//   // DELETE
//   const handleDelete = (id: number) => {
//     deleteMutation.mutate(id, {
//       onSuccess: () => alert('User deleted!'),
//       onError: (err) => alert('Delete failed: ' + err),
//     });
//   };

//   if (isLoading) return <div>Loading users...</div>;
//   if (isError) return <div>Error loading users</div>;

//   return (
//     <div className="p-4 space-y-4">
//       <h1 className="text-xl font-bold">Users</h1>

//       {/* Create Form */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="New user name"
//           value={newName}
//           onChange={(e) => setNewName(e.target.value)}
//           className="border p-1"
//         />
//         <button
//           onClick={handleCreate}
//           className="bg-blue-500 text-white px-2 py-1 rounded"
//           disabled={createMutation.isLoading}
//         >
//           {createMutation.isLoading ? 'Creating...' : 'Create'}
//         </button>
//       </div>

//       {/* User List */}
//       <div className="space-y-2">
//         {allUsers.map((user) => (
//           <div key={user.id} className="flex items-center gap-2">
//             {editId === user.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                   className="border p-1"
//                 />
//                 <button
//                   onClick={() => handleUpdate(user.id)}
//                   className="bg-green-500 text-white px-2 py-1 rounded"
//                   disabled={updateMutation.isLoading}
//                 >
//                   {updateMutation.isLoading ? 'Saving...' : 'Save'}
//                 </button>
//                 <button
//                   onClick={() => setEditId(null)}
//                   className="bg-gray-300 px-2 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <span>{user.name}</span>
//                 <button
//                   onClick={() => {
//                     setEditId(user.id);
//                     setEditName(user.name);
//                   }}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(user.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   disabled={deleteMutation.isLoading}
//                 >
//                   {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
//                 </button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Infinite Scroll Button */}
//       {hasNextPage && (
//         <button
//           onClick={() => fetchNextPage()}
//           className="bg-gray-800 text-white px-4 py-2 rounded mt-2"
//           disabled={isFetchingNextPage}
//         >
//           {isFetchingNextPage ? 'Loading...' : 'Load More'}
//         </button>
//       )}
//     </div>
//   );
// };

// export default MyComponent;

