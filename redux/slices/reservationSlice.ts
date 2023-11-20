import { ReservableInt } from "@/styles/ModelTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const reservationSlice = createSlice({
    name:"reservation",
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

export const {setReservable,setSpaceName} = reservationSlice.actions;



export default reservationSlice.reducer;