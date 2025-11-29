import { baseApi } from "./baseApi";
import { TAppliedJob } from "@/types/job";

export const jobApplicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyApplications: builder.query<{ data: TAppliedJob[] }, void>({
      query: () => "/job-applications/my-applications",
      providesTags: ["JobApplications"],
    }),
    deleteJobApplication: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/job-applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["JobApplications"],
    }),
  }),
});

export const { useGetMyApplicationsQuery, useDeleteJobApplicationMutation } =
  jobApplicationsApi;
