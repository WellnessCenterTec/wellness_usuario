"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/shared/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  showLoginPrompt?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = "/login",
  showLoginPrompt = false 
}: ProtectedRouteProps) {
  const { auth, cargando } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !auth?.id) {
      if (showLoginPrompt) {
        // Show a modal or alert before redirecting
        const shouldRedirect = confirm(
          "Necesitas iniciar sesión para acceder a esta función. ¿Deseas ir a la página de inicio de sesión?"
        );
        if (shouldRedirect) {
          router.push(redirectTo);
        } else {
          router.push("/");
        }
      } else {
        router.push(redirectTo);
      }
    }
  }, [auth, cargando, router, redirectTo, showLoginPrompt]);

  if (cargando) {
    return <Loader />;
  }

  if (!auth?.id) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
