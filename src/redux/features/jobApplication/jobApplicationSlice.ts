import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobApplicationState {
  appliedJobIds: string[];
}

const initialState: JobApplicationState = {
  appliedJobIds: [],
};

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState,
  reducers: {
    setAppliedJobIds: (state, action: PayloadAction<string[]>) => {
      state.appliedJobIds = action.payload;
    },
    addAppliedJobId: (state, action: PayloadAction<string>) => {
      if (!state.appliedJobIds.includes(action.payload)) {
        state.appliedJobIds.push(action.payload);
      }
    },
    removeAppliedJobId: (state, action: PayloadAction<string>) => {
      state.appliedJobIds = state.appliedJobIds.filter(
        (id) => id !== action.payload
      );
    },
    clearApplications: (state) => {
      state.appliedJobIds = [];
    },
  },
});

export const {
  setAppliedJobIds,
  addAppliedJobId,
  removeAppliedJobId,
  clearApplications,
} = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer;
