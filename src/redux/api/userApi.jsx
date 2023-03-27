import { indexApi } from "./indexApi";

const extendedIndexApi = indexApi.injectEndpoints({
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["User"],
    }),
    getUserSearch: builder.query({
      query: (keyword) => `users/search?query=${keyword}`,
      providesTags: ["User"],
    }),
    getUserAppointments: builder.query({
      query: (userId) => `users/${userId}/appointments`,
      providesTags: ["User"],
    }),
    createNewUser: builder.mutation({
      query: (payload) => ({
        url: "users",
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `users/${payload.userId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
  useGetUserSearchQuery,
  useGetUserAppointmentsQuery,
  useCreateNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = extendedIndexApi;
