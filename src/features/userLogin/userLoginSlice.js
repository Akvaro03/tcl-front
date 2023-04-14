import { createSlice } from "@reduxjs/toolkit";

const initialState = []
const userLogin = createSlice({
    name: "userLogin",
    initialState,
    reducers:{
        addUser: (state, {payload}) => {
            let newState = payload;
            console.log(payload)
            // newState.push(payload);
            return newState;
        },
        editUser: (state, action) => {

        },
        deleteUser: (state, action) => {

        }
    }
});

export const { addUser, editUser, deleteUser } = userLogin.actions;
export default userLogin.reducer;

