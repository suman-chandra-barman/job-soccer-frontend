import { baseApi } from "@/redux/api/baseApi";

const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: (filters) => ({
        url: "/candidate/search",
        method: "GET",
        params: filters,
      }),
    }),
    getCandidateById: builder.query({
      query: (id) => ({
        url: `/candidate/${id}`,
        method: "GET",
      }),
    }),
    getCandidateFeatured: builder.query({
      query: () => ({
        url: "/candidate/featured",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCandidatesQuery, useGetCandidateByIdQuery, useGetCandidateFeaturedQuery } = candidateApi;
