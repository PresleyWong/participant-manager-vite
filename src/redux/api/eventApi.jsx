import { indexApi } from "./indexApi";

const extendedIndexApi = indexApi.injectEndpoints({
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => "events",
      providesTags: ["Event"],
    }),
    getArchivedEvents: builder.query({
      query: () => "events/archive",
      providesTags: ["Event"],
    }),
    getEventsWithLimit: builder.query({
      query: (limit) => `events?limit=${limit}`,
      providesTags: ["Event"],
    }),
    getEventDetails: builder.query({
      query: (eventId) => `events/${eventId}`,
      providesTags: ["Event"],
    }),
    getEventDetailWithAppointments: builder.query({
      async queryFn(eventId, _queryApi, _extraOptions, baseQuery) {
        const event = await baseQuery(`/events/${eventId}`);
        if (event.error) return { error: event.error };
        const participants = await baseQuery(`/events/${eventId}/participants`);
        if (participants.error) return { error: participants.error };

        const appointments = await Promise.all(
          participants.data.map((item) =>
            baseQuery(`/events/${eventId}/participant_appointment/${item.id}`)
          )
        ).then((response) => Promise.all(response.map((r) => r.data[0])));

        const users = await Promise.all(
          appointments.map((r) => baseQuery(`/users/${r.user_id}`))
        ).then((res) => Promise.all(res.map((r) => r.data)));

        return participants
          ? {
              data: {
                event: event.data,
                participants: participants.data.map((k, i) => ({
                  ...k,
                  server: users[i].name,
                  register_time: appointments[i].created_at,
                  event_id: event.data.id,
                  appointment_id: appointments[i].id,
                  remarks: appointments[i].remarks,
                  language: appointments[i].language,
                })),
              },
            }
          : { error: participants.error };
      },
      providesTags: ["Event"],
    }),

    createNewEvent: builder.mutation({
      query: (payload) => ({
        url: "events",
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: ["Event"],
    }),
    updateEvent: builder.mutation({
      query: (payload) => ({
        url: `events/${payload.eventId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `events/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEventAttachments: builder.mutation({
      query: (payload) => ({
        url: `events/${payload.eventId}/remove_attachments/${payload.fileIndex}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    addParticipantToEvent: builder.mutation({
      query: (payload) => ({
        url: `events/${payload.eventId}/register/${payload.participantId}`,
        body: payload.body,
        method: "POST",
      }),
      invalidatesTags: ["Event"],
    }),
    removeParticipantFromEvent: builder.mutation({
      query: (payload) => ({
        url: `appointments/${payload.appointmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    updateParticipantAppointment: builder.mutation({
      query: (payload) => ({
        url: `appointments/${payload.appointmentId}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetArchivedEventsQuery,
  useGetEventDetailsQuery,
  useGetEventDetailWithAppointmentsQuery,
  useCreateNewEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useDeleteEventAttachmentsMutation,
  useAddParticipantToEventMutation,
  useRemoveParticipantFromEventMutation,
  useGetEventsWithLimitQuery,
  useUpdateParticipantAppointmentMutation,
} = extendedIndexApi;
