import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
  name: "requsets",
  initialState: {
    requestsData:{},
  },
  reducers: {
    updateRequestData: (state, action) => {
      // state.requestsData.push(action.payload)
      state.requestsData = action.payload;
    },
    removeRequestData: (state,action) => {
      state.requestsData.results.filter(result => result.id !== action.payload.id)
      
    }
  }
})
export const { updateRequestData,removeRequestData } = requestSlice.actions;
export default requestSlice.reducer;