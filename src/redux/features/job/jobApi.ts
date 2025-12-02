import { baseApi } from "@/redux/api/baseApi";
import { CreateJobPayload } from "@/shchemas/jobValidation";
import { TJob } from "@/types/job";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<{ data: TJob }, CreateJobPayload>({
      query: (jobData) => ({
        url: "/job",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: [
        { type: "Job", id: "LIST" },
        { type: "Job", id: "RECENT" },
        { type: "Job", id: "COUNTS" },
      ],
    }),

    getJobsWithFilters: builder.query({
      query: (filters = {}) => ({
        url: "/job",
        method: "GET",
        params: filters,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Job" as const,
                id: _id,
              })),
              { type: "Job", id: "LIST" },
            ]
          : [{ type: "Job", id: "LIST" }],
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),

    getNewFourJobs: builder.query({
      query: () => ({
        url: "/job/last-four",
        method: "GET",
      }),
      providesTags: [{ type: "Job", id: "RECENT" }],
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),

    getSingleJob: builder.query({
      query: (id: string) => ({
        url: `/job/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Job", id }],
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),

    getPopularSearch: builder.query({
      query: () => ({
        url: "/search-history/top",
        method: "GET",
      }),
      providesTags: [{ type: "PopularSearch", id: "LIST" }],
      keepUnusedDataFor: 600, // Cache for 10 minutes (searches don't change frequently)
    }),

    getJobCountsByRole: builder.query({
      query: () => ({
        url: "/job/counts-by-role",
        method: "GET",
      }),
      providesTags: [{ type: "Job", id: "COUNTS" }],
      keepUnusedDataFor: 600, // Cache for 10 minutes (counts don't change frequently)
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsWithFiltersQuery,
  useLazyGetJobsWithFiltersQuery,
  useGetNewFourJobsQuery,
  useGetSingleJobQuery,
  useLazyGetSingleJobQuery,
  useGetPopularSearchQuery,
  useGetJobCountsByRoleQuery,
} = jobApi;
