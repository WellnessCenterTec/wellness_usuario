import { createSlice } from "@reduxjs/toolkit";



export const modalSlice = createSlice({
    name:"modal",
    initialState:{
        modalEjemplo:false
    },
    reducers:{
        toggleModalEjemplo:(state)=>{
            state.modalEjemplo = !state.modalEjemplo
        }
    }
})



export const {toggleModalEjemplo} = modalSlice.actions;
export default modalSlice.reducer