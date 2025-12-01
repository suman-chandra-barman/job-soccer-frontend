import { baseApi } from "@/redux/api/baseApi";
import { TAppliedJob } from "@/types/job";

const jobApplicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: (jobId: string) => ({
        url: "/job-applications/apply",
        method: "POST",
        body: { jobId },
      }),
      invalidatesTags: [{ type: "Job", id: "APPLICATIONS" }, "JobApplications"],
    }),

    getMyApplications: builder.query<{ data: TAppliedJob[] }, void>({
      query: () => "/job-applications/my-applications",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Job" as const,
                id: _id,
              })),
              { type: "Job", id: "APPLICATIONS" },
              "JobApplications",
            ]
          : [{ type: "Job", id: "APPLICATIONS" }, "JobApplications"],
      keepUnusedDataFor: 300,
    }),

    withdrawApplication: builder.mutation({
      query: (applicationId: string) => ({
        url: `/job-applications/${applicationId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Job", id: "APPLICATIONS" }, "JobApplications"],
    }),

    deleteJobApplication: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/job-applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Job", id: "APPLICATIONS" }, "JobApplications"],
    }),
  }),
});

export const {
  useApplyJobMutation,
  useGetMyApplicationsQuery,
  useLazyGetMyApplicationsQuery,
  useWithdrawApplicationMutation,
  useDeleteJobApplicationMutation,
} = jobApplicationApi;
