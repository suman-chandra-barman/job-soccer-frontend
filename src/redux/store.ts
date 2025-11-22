import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth/authSlice";
import savedJobsReducer from "@/redux/features/savedJobs/savedJobsSlice";
import jobApplicationReducer from "@/redux/features/jobApplication/jobApplicationSlice";
import resumeReducer from "@/redux/features/resume/resumeSlice";
import candidateShortlistReducer from "@/redux/features/candidateShortlist/candidateShortlistSlice";
import { baseApi } from "./api/baseApi";

// Create a single store instance for the app
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    savedJobs: savedJobsReducer,
    jobApplication: jobApplicationReducer,
    resume: resumeReducer,
    candidateShortlist: candidateShortlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Helper for SSR or tests that need to create a store instance
export const makeStore = () => store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
