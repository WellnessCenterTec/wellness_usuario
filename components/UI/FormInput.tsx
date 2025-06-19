"use client";

import React, { forwardRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheckCircle } from "react-icons/ai";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  isValid?: boolean;
  helpText?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      touched,
      icon,
      showPasswordToggle = false,
      showPassword = false,
      onTogglePassword,
      isValid = false,
      helpText,
      className = "",
      ...props
    },
    ref
  ) => {
    const hasError = error && touched;
    const showSuccess = isValid && touched && !error;

    return (
      <div className="space-y-2">
        <label htmlFor={props.id} className="block text-sm font-medium text-white">
          {label}
        </label>
        <div className="relative">
          {/* Left Icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          
          {/* Input Field */}
          <input
            ref={ref}
            {...props}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} ${
              showPasswordToggle ? 'pr-12' : showSuccess ? 'pr-10' : 'pr-4'
            } py-3 bg-white/20 border rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
              hasError
                ? 'border-red-400 focus:ring-red-400'
                : 'border-white/30'
            } ${className}`}
          />

          {/* Password Toggle Button */}
          {showPasswordToggle && onTogglePassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-200 hover:text-white transition-colors duration-200"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5" />
              ) : (
                <AiOutlineEye className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Success Icon */}
          {showSuccess && !showPasswordToggle && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <AiOutlineCheckCircle className="h-5 w-5 text-green-400" />
            </div>
          )}
        </div>

        {/* Help Text */}
        {helpText && !hasError && (
          <p className="text-blue-200 text-xs">
            {helpText}
          </p>
        )}

        {/* Error Message */}
        {hasError && (
          <p className="text-red-300 text-sm animate-slide-down">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
