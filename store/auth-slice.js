import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  id: null,
  username: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, user) => {
      console.log('userData: ', user.payload);
      // console.log('state changed');
      state = {
        id: user.payload?.id,
        username: user.payload?.username,
        isLoggedIn: user.payload?.isLoggedIn
      }
      return state;
    },
    logout: (state) => {
      return initialState;
    },
    tokenExpiredLogout: (state) => {
      return initialState;
    }
  }


});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;