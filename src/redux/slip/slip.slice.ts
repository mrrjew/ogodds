import { createSlice } from "@reduxjs/toolkit";
import { CreateSlip, DeleteSlip, DeleteSlips, GetAllGroupedSlips,GetAllSlips, LatestSlip, UpdateSlip } from "./slip.reducer";

const initialState = {
  loading: false,
  error: false,
  success: false,
  latestSlip: {},
  allSlips: [{}],
  slips: [{}],
};

const slipSlice = createSlice({
  name: "slip",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(LatestSlip.pending, (state) => {
        state.loading = true;
      })
      .addCase(LatestSlip.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.latestSlip = action.payload;
      })
      .addCase(LatestSlip.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(GetAllSlips.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllSlips.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.allSlips = action.payload;
      })
      .addCase(GetAllSlips.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(GetAllGroupedSlips.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllGroupedSlips.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.slips = action.payload;
      })
      .addCase(GetAllGroupedSlips.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(DeleteSlip.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteSlip.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(DeleteSlip.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(DeleteSlips.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteSlips.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(DeleteSlips.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(CreateSlip.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateSlip.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(CreateSlip.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(UpdateSlip.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateSlip.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(UpdateSlip.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
  },
});

export const { reset } = slipSlice.actions;
export default slipSlice.reducer;
