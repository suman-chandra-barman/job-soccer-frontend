import { baseApi } from "@/redux/api/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobsWithFilters: builder.mutation({
      query: (filters) => ({
        url: "/job",
        method: "GET",
        params: filters,
      }),
    }),

    getNewFourJobs: builder.query({
      query: () => ({
        url: "/job/last-four",
        method: "GET",
      }),
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),

    getSingleJob: builder.mutation({
      query: (id) => ({
        url: `/job/${id}`,
        method: "GET",
      }),
    }),
    getPopularSearch: builder.mutation({
      query: () => ({
        url: "/search-history/top",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetJobsWithFiltersMutation,
  useGetNewFourJobsQuery,
  useGetSingleJobMutation,
  useGetPopularSearchMutation,
} = jobApi;
