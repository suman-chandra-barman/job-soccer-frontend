import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE USER PROFILE (with form-data)
    createUserProfile: builder.mutation({
      query: (userInfo) => {
        console.log("Creating user profile with info:", userInfo);
        return {
          url: "/user/profile",
          method: "POST",
          body: userInfo,
        };
      },
    }),
  }),
});

export const { useCreateUserProfileMutation } = userApi;
