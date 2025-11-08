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
  }),
});

export const { useGetJobsWithFiltersMutation } = jobApi;
