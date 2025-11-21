import { baseApi } from "@/redux/api/baseApi";

const jobApplicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: (jobId: string) => ({
        url: "/job-applications/apply",
        method: "POST",
        body: { jobId },
      }),
      invalidatesTags: [{ type: "Job", id: "APPLICATIONS" }],
    }),

    getMyApplications: builder.query({
      query: () => ({
        url: "/job-applications",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Job" as const,
                id: _id,
              })),
              { type: "Job", id: "APPLICATIONS" },
            ]
          : [{ type: "Job", id: "APPLICATIONS" }],
      keepUnusedDataFor: 300,
    }),

    withdrawApplication: builder.mutation({
      query: (applicationId: string) => ({
        url: `/job-applications/${applicationId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Job", id: "APPLICATIONS" }],
    }),
  }),
});

export const {
  useApplyJobMutation,
  useGetMyApplicationsQuery,
  useLazyGetMyApplicationsQuery,
  useWithdrawApplicationMutation,
} = jobApplicationApi;
