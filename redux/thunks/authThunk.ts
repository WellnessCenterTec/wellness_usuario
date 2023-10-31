import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";
import { handleError } from "@/utils/errorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

import jsCookie from "js-cookie"

export const loadPerfil = createAsyncThunk(
  "/auth/loadPerfil",
  async (action) => {
    try {
      const config = axiosConfig();
      if (!config) {
        return;
      }

      const { data } = await clienteAxios("/user/profile", config);

      return data;
    } catch (error: any) {
      handleError(error);
    }
  }
);


