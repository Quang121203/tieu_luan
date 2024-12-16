import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    roles:[],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.roles = action.payload.roles;
        },
        logout: (state) => {
            state.username = initialState.username;
            state.roles = initialState.roles;
        }
    },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer
