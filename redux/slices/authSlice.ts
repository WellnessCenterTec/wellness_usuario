
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadPerfil } from "../thunks/authThunk";
import { AdminInt } from "@/styles/ModelTypes";


// Creacion del slice

export const rutinaSlice = createSlice({
  name: "auth",
  initialState: {
    auth:null as null | AdminInt,
    cargando:true
  },
  reducers: {
    setAuth:(state,action)=>{
      state.auth = action.payload
      state.cargando = false
  },
  removeAuth:(state)=>{
      state.auth = null
  }
  },
  extraReducers(builder) {
    // Perfil Load
    builder.addCase(loadPerfil.pending,(state,action)=>{
        state.cargando = true
    }),
    builder.addCase(loadPerfil.fulfilled,(state,action)=>{
        state.auth = action.payload
        state.cargando = false
    }),
    builder.addCase(loadPerfil.rejected,(state,action)=>{
        state.cargando = false
    })
    

}
  
});

// Exportacion de las acciones generadas
export const {setAuth,removeAuth} = rutinaSlice.actions;

// Exportacion del reducer
export default rutinaSlice.reducer;
