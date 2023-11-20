import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const indexSlice = createSlice({
    name:"index",
    initialState:{
        idReservable: null as null | number,
        spaceName:null as null | string,
        hour: null as null | string,
        teacher: null as null | string,
        teacherId: null as null | number,
        spaceId: null as null | number,
        actualQuota: null as null | number,
        quota: null as null | number,
        init_date: null as null | Date,
        end_date: null as null | Date,

    },
    reducers:{
        setSpaceName:(state,action:PayloadAction<string>)=>{
            state.spaceName = action.payload
        }, 
        setidReservable:(state,action:PayloadAction<number>)=>{
            state.idReservable = action.payload
        }, 
        setHour:(state,action:PayloadAction<string>)=>{
            state.hour = action.payload
        },
        setTeacher:(state,action:PayloadAction<string>)=>{
            state.teacher = action.payload
        },
        setTeacherId:(state,action:PayloadAction<number>)=>{
            state.teacherId = action.payload
        },
        setSpaceId:(state,action:PayloadAction<number>)=>{
            state.spaceId = action.payload
        },
        setActualQuota:(state,action:PayloadAction<number>)=>{
            state.actualQuota = action.payload
        },
        setQuota:(state,action:PayloadAction<number>)=>{
            state.quota = action.payload
        },
        setInit_date:(state,action:PayloadAction<Date>)=>{
            state.init_date = action.payload
        },
        setEnd_date:(state,action:PayloadAction<Date>)=>{
            state.end_date = action.payload
        }
        
    }
})

export const {setSpaceName} = indexSlice.actions;
export const {setidReservable} = indexSlice.actions;
export const {setHour} = indexSlice.actions;
export const {setTeacher} = indexSlice.actions;
export const {setTeacherId} = indexSlice.actions;
export const {setSpaceId} = indexSlice.actions;
export const {setActualQuota} = indexSlice.actions;
export const {setQuota} = indexSlice.actions;
export const {setInit_date} = indexSlice.actions;
export const {setEnd_date} = indexSlice.actions;


export default indexSlice.reducer;