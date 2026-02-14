"use client";

import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background: '#ffffff',
          color: '#000000',
          border: '1px solid #afafaf',
          fontSize: '14px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        },
        classNames: {
          toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#000] group-[.toaster]:border-[#afafaf]/30 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-[#666]',
          actionButton: 'group-[.toast]:bg-[#ff0000] group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-[#afafaf] group-[.toast]:text-[#000]',
          
          // Success toast - Verde con accento rosso
          success: 'group-[.toaster]:!bg-[#16a34a]/10 group-[.toaster]:!text-[#000] group-[.toaster]:!border-[#16a34a]',
          
          // Error toast - Rosso ABAMC
          error: 'group-[.toaster]:!bg-[#ff0000]/10 group-[.toaster]:!text-[#000] group-[.toaster]:!border-[#ff0000]',
          
          // Info toast - Grigio ABAMC
          info: 'group-[.toaster]:!bg-[#afafaf]/10 group-[.toaster]:!text-[#000] group-[.toaster]:!border-[#afafaf]',
          
          // Warning toast - Arancione
          warning: 'group-[.toaster]:!bg-[#f59e0b]/10 group-[.toaster]:!text-[#000] group-[.toaster]:!border-[#f59e0b]',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };