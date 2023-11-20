import { ReservableInt } from "@/styles/ModelTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const reservableSlice = createSlice({
    name:"reservable",
    initialState:{
        spaceName: "",
        reservable: null as null | ReservableInt
        

    },
    reducers:{
        setReservable: (state,action:PayloadAction<ReservableInt>)=>{
            state.reservable = action.payload
        },
        setSpaceName : (state,action:PayloadAction<string>)=>{
            state.spaceName = action.payload
        }
       
    }
})

export const {setReservable,setSpaceName} = reservableSlice.actions;



export default reservableSlice.reducer;