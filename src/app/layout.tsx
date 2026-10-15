import type { Metadata } from "next";
import "./globals.css"; // <-- CRUCIAL: Debe estar aquí

export const metadata: Metadata = {
  title: "Moofin Protocol | Gestión de Carreras",
  description: "Plataforma integral para eventos deportivos y cronometraje",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
