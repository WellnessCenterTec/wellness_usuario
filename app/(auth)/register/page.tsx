"use client";

import clienteAxios from "@/config/clienteAxios";
import Image from "next/image";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsCookie from "js-cookie";
import { setAuth } from "@/redux/slices/authSlice";
import { handleError } from "@/utils/errorHandler";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineLock, AiOutlineLoading3Quarters, AiOutlineCheckCircle } from "react-icons/ai";

interface FormErrors {
  registration?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const dispatch = useDispatch();

  // Validation functions
  const validateRegistration = (value: string): string | undefined => {
    if (!value.trim()) {
      return "La matrícula es requerida";
    }
    if (!/^[Aa]\d{8}$/.test(value)) {
      return "La matrícula debe tener el formato A00000000";
    }
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return "La contraseña es requerida";
    }
    if (value.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
      return "La contraseña debe contener al menos una mayúscula y una minúscula";
    }
    if (!/(?=.*\d)/.test(value)) {
      return "La contraseña debe contener al menos un número";
    }
    return undefined;
  };

  const validateConfirmPassword = (value: string): string | undefined => {
    if (!value) {
      return "Confirma tu contraseña";
    }
    if (value !== password) {
      return "Las contraseñas no coinciden";
    }
    return undefined;
  };

  // Real-time validation
  useEffect(() => {
    if (touched.registration) {
      const error = validateRegistration(registration);
      setErrors(prev => ({ ...prev, registration: error }));
    }
  }, [registration, touched.registration]);

  useEffect(() => {
    if (touched.password) {
      const error = validatePassword(password);
      setErrors(prev => ({ ...prev, password: error }));
    }
    // Also revalidate confirm password when password changes
    if (touched.confirmPassword) {
      const confirmError = validateConfirmPassword(confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  }, [password, touched.password, confirmPassword, touched.confirmPassword]);

  useEffect(() => {
    if (touched.confirmPassword) {
      const error = validateConfirmPassword(confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: error }));
    }
  }, [confirmPassword, touched.confirmPassword, password]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ registration: true, password: true, confirmPassword: true });

    // Validate all fields
    const registrationError = validateRegistration(registration);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    const newErrors: FormErrors = {
      registration: registrationError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (registrationError || passwordError || confirmPasswordError) {
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await clienteAxios.post("/user/create", {
        registration: registration.toUpperCase(),
        password,
      });

      jsCookie.set("token", data.token, {
        expires: new Date().setMonth(new Date().getMonth() + 1),
      });

      dispatch(setAuth(data));
      window.location.href = "/";
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/borregos.jpg"
          alt="Wellness Center Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-slate-900/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-8">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-700 rounded-2xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/borrego.png"
                alt="Wellness Center Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">¡Te damos la bienvenida!</h1>
          <p className="text-blue-100">Crea tu cuenta en Wellness Center</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            {/* Registration Field */}
            <div className="space-y-2 mb-4">
              <label htmlFor="registration" className="block text-sm font-medium text-white">
                Matrícula
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineUser className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  id="registration"
                  type="text"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                  onBlur={() => handleBlur('registration')}
                  placeholder="A00000000"
                  className={`w-full pl-10 pr-4 py-3 bg-white/20 border rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                    errors.registration && touched.registration
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/30'
                  }`}
                  autoComplete="username"
                  inputMode="text"
                />
                {!errors.registration && touched.registration && registration && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <AiOutlineCheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                )}
              </div>
              {errors.registration && touched.registration && (
                <p className="text-red-300 text-sm mt-1 animate-slide-down">
                  {errors.registration}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2 mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineLock className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 bg-white/20 border rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                    errors.password && touched.password
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/30'
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-200 hover:text-white transition-colors duration-200"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          passwordStrength >= level
                            ? passwordStrength === 1
                              ? 'bg-red-400'
                              : passwordStrength === 2
                              ? 'bg-yellow-400'
                              : passwordStrength === 3
                              ? 'bg-blue-400'
                              : 'bg-green-400'
                            : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-blue-200 mt-1">
                    {passwordStrength === 0 && "Muy débil"}
                    {passwordStrength === 1 && "Débil"}
                    {passwordStrength === 2 && "Regular"}
                    {passwordStrength === 3 && "Buena"}
                    {passwordStrength === 4 && "Excelente"}
                  </p>
                </div>
              )}

              {errors.password && touched.password && (
                <p className="text-red-300 text-sm mt-1 animate-slide-down">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2 mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineLock className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 bg-white/20 border rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/30'
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-200 hover:text-white transition-colors duration-200"
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
                {!errors.confirmPassword && touched.confirmPassword && confirmPassword && confirmPassword === password && (
                  <div className="absolute inset-y-0 right-12 pr-3 flex items-center">
                    <AiOutlineCheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                )}
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-300 text-sm mt-1 animate-slide-down">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
                  Creando cuenta...
                </div>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              href="/login"
              className="text-blue-200 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              ¿Ya tienes cuenta?{" "}
              <span className="underline decoration-2 underline-offset-2">
                Inicia sesión aquí
              </span>
            </Link>
          </div>
        </form>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
