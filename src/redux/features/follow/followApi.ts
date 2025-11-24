import { baseApi } from "@/redux/api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followEmployer: builder.mutation({
      query: (employerId: string) => ({
        url: "/follow",
        method: "POST",
        body: { employerId },
      }),
      invalidatesTags: [
        { type: "Employer", id: "FOLLOWING" },
        { type: "Employer", id: "LIST" },
      ],
    }),

    unfollowEmployer: builder.mutation({
      query: (employerId: string) => ({
        url: `/follow/${employerId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Employer", id: "FOLLOWING" },
        { type: "Employer", id: "LIST" },
      ],
    }),

    getFollowedEmployers: builder.query({
      query: () => ({
        url: "/follow",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Employer" as const,
                id: _id,
              })),
              { type: "Employer", id: "FOLLOWING" },
            ]
          : [{ type: "Employer", id: "FOLLOWING" }],
      keepUnusedDataFor: 300,
    }),

    checkFollowStatus: builder.query({
      query: (employerId: string) => ({
        url: `/follow/status/${employerId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, employerId) => [
        { type: "Employer", id: employerId },
      ],
    }),
  }),
});

export const {
  useFollowEmployerMutation,
  useUnfollowEmployerMutation,
  useGetFollowedEmployersQuery,
  useLazyGetFollowedEmployersQuery,
  useCheckFollowStatusQuery,
  useLazyCheckFollowStatusQuery,
} = followApi;
