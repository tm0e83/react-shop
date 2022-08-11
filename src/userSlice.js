import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'general',
  initialState: {
    gender: 0,
    firstname: '',
    lastname: '',
  },
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload;
    },

    setFirstname: (state, action) => {
      state.firstname = action.payload;
    },

    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
  },
});

export const { setGender, setFirstname, setLastname } = userSlice.actions;
export default userSlice.reducer;
