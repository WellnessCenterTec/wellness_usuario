import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const indexSlice = createSlice({
    name:"index",
    initialState:{
        spaceName:null as null | string,

    },
    reducers:{
        setSpaceName:(state,action:PayloadAction<string>)=>{
            state.spaceName = action.payload
        }
        
    }
})

export const {setSpaceName} = indexSlice.actions;


export default indexSlice.reducer;