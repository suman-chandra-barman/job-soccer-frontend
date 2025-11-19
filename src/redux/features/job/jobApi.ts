import { baseApi } from "@/redux/api/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobsWithFilters: builder.mutation({
      query: (filters) => ({
        url: "/jobs",
        method: "GET",
        params: filters,
      }),
    }),

    getNewFourJobs: builder.mutation({
      query: () => ({
        url: "/job/last-four",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetJobsWithFiltersMutation, useGetNewFourJobsMutation } = jobApi;