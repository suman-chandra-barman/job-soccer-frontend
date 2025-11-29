import { baseApi } from "./baseApi";
import { TSavedJob } from "@/types/job";

export const savedJobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSavedJobs: builder.query<{ data: TSavedJob[] }, void>({
      query: () => "/saved-jobs",
      providesTags: ["SavedJobs"],
    }),
    deleteSavedJob: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/saved-jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJobs"],
    }),
  }),
});

export const { useGetSavedJobsQuery, useDeleteSavedJobMutation } = savedJobsApi;
