import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: "",
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    accessToken: '',
};

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = { ...action.payload };
        },

        setUserLogin: (state, action) => {
            if (action.payload && action.payload) {
                const user = action.payload;
                state.id = user.id;
                state.firstName = user.firstName;
                state.lastName = user.lastName;
                state.fullName = user.firstName + " " + user.lastName;
                state.email = user.email;
                state.avatar = user.avatar;
            }
        },

        setToken: (state, action) => {
            state.accessToken = action.payload;
        },

        resetUserState: () => initialState,
    },
});

export const {
    setUserLogin,
    resetUserState,
    setToken,
} = UserSlice.actions;

export default UserSlice.reducer;
