"use client";

import Loader from "@/components/shared/Loader";
import { RootState } from "@/redux/store";
import { loadPerfil } from "@/redux/thunks/authThunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PublicLayout from "@/components/layouts/PublicLayout";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  const { auth, cargando } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(loadPerfil());
  }, []);

  if (cargando) {
    return <Loader />;
  }

  // If user is authenticated, show authenticated layout
  if (auth?.id) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  }

  // If user is not authenticated, show public layout
  return <PublicLayout>{children}</PublicLayout>;
}
