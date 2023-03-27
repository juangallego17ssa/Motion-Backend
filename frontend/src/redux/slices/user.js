import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
  },
  reducers: {
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateFollowingNumber: (state, action) => {
      state.userData.amount_following = action.payload;
    }
  }
})
export const { updateUserData, updateFollowingNumber } = userSlice.actions;
export default userSlice.reducer;