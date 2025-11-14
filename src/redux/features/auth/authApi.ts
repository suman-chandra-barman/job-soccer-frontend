import { baseApi } from "@/redux/api/baseApi";
import { setCredentials } from "./authSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    // SIGNUP
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),

    // EMAIL VERIFICATION
    emailVerify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data.accessToken) {
            const token = data.data.accessToken;
            localStorage.setItem("tempAccessToken", token);
            dispatch(setCredentials({ user: null, token }));
          } else {
            console.warn("No token found in verification response:", data);
          }
        } catch (error) {
          console.error("Email verification failed:", error);
        }
      },
    }),

    // RESEND OTP
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    // FORGOT PASSWORD
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // RESET PASSWORD
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // CHANGE PASSWORD (for logged-in user)
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    //  GET CURRENT USER
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = localStorage.getItem("tempAccessToken");
          
          if (token) {
            dispatch(setCredentials({ user: data.data, token }));
          }
        } catch (err) {
          console.error("Get user info failed:", err);
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useEmailVerifyMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
} = authApi;
