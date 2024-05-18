import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="center-sm flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
