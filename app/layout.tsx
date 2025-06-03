import '@/styles/globals.css'
import { Metadata } from "next";
import ReduxProvider from "@/redux/ReduxProvider";
import { NextUIProvider } from '@nextui-org/react';


interface RootProps {
  children: React.ReactNode;
}


export const metadata: Metadata = {
  title:"Wellness usuario",
  description:"Wellness usuario",
  icons:[
    {rel:"shortcut icon",url:"/icono.svg"},
    {rel:"icon",url:"/icono.svg"},
    {rel:"favicon",url:"/icono.svg"},
    
  ]
};

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="es-MX">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <ReduxProvider>

        <body
          className='w-full min-h-screen bg-gray-100'
        >{children}</body>
      </ReduxProvider>


    </html>
  );
}
