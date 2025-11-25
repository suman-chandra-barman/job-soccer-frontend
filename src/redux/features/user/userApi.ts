import { baseApi } from "@/redux/api/baseApi";
import { setCredentials } from "../auth/authSlice";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE USER PROFILE (with form-data)
    createUserProfile: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/profile",
          method: "POST",
          body: userInfo,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = localStorage.getItem("accessToken");

          if (token) {
            dispatch(setCredentials({ user: data.data, token }));
          }
        } catch (err) {
          console.error("Get user info failed:", err);
        }
      },
      invalidatesTags: [{ type: "User" }],
    }),

    // UPDATE PROFILE IMAGE
    updateProfileImage: builder.mutation({
      query: (formData: FormData) => ({
        url: "/user/profile",
        method: "PATCH",
        body: formData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = localStorage.getItem("accessToken");

          if (token) {
            dispatch(setCredentials({ user: data.data, token }));
          }
        } catch (err) {
          console.error("Update profile image failed:", err);
        }
      },
      invalidatesTags: [{ type: "User" }],
    }),

    // UPDATE BANNER IMAGE
    updateBannerImage: builder.mutation({
      query: (formData: FormData) => ({
        url: "/user/profile",
        method: "PATCH",
        body: formData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = localStorage.getItem("accessToken");

          if (token) {
            dispatch(setCredentials({ user: data.data, token }));
          }
        } catch (err) {
          console.error("Update banner image failed:", err);
        }
      },
      invalidatesTags: [{ type: "User" }],
    }),
  }),
});

export const {
  useCreateUserProfileMutation,
  useUpdateProfileImageMutation,
  useUpdateBannerImageMutation,
} = userApi;
