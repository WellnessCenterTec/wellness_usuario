"use client";

import Link from "next/link";
import React from "react";
import { AiOutlineMessage, AiOutlineCode } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Wellness Center</p>
              <p className="text-xs text-slate-600">Un espacio para tu bienestar</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://forms.gle/feedback-wellness-center"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
            >
              <AiOutlineMessage className="w-4 h-4" />
              <span className="text-sm font-medium">Feedback</span>
              <HiExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
            </Link>
            
            <Link
              href="https://github.com/WellnessCenterTec/wellness_usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
            >
              <AiOutlineCode className="w-4 h-4" />
              <span className="text-sm font-medium">Colaborar</span>
              <HiExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} Wellness Center. Desarrollado con ❤️ por estudiantes para estudiantes.
          </p>
        </div>
      </div>
    </footer>
  );
}
