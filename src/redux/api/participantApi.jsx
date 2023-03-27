import { indexApi } from "./indexApi";

const extendedIndexApi = indexApi.injectEndpoints({
  tagTypes: ["Participant"],
  endpoints: (builder) => ({
    getAllParticipants: builder.query({
      query: () => "participants",
      providesTags: ["Participant"],
    }),
    getParticipantDetails: builder.query({
      query: (participantId) => `participants/${participantId}`,
      providesTags: ["Participant"],
    }),
    getParticipantSearch: builder.query({
      query: (keyword) => `participants/search?query=${keyword}`,
      providesTags: ["Participant"],
    }),
    getParticipantEvents: builder.query({
      query: (participantId) => `participants/${participantId}/events`,
      providesTags: ["Participant"],
    }),
    createNewParticipant: builder.mutation({
      query: (payload) => ({
        url: "participants",
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: ["Participant"],
    }),
    updateParticipant: builder.mutation({
      query: (payload) => ({
        url: `participants/${payload.participantId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: ["Participant", "Event"],
    }),
    deleteParticipant: builder.mutation({
      query: (participantId) => ({
        url: `participants/${participantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Participant"],
    }),
  }),
});

export const {
  useGetAllParticipantsQuery,
  useGetParticipantDetailsQuery,
  useGetParticipantSearchQuery,
  useGetParticipantEventsQuery,
  useCreateNewParticipantMutation,
  useUpdateParticipantMutation,
  useDeleteParticipantMutation,
} = extendedIndexApi;
