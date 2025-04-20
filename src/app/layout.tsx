"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { axiosInstance } from "@/api/instance";
import { useUserStore } from "@/stores/auth";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const getMe = async () => {
      const authStorage = localStorage.getItem("auth-storage");

      if (!authStorage) return;

      const accessToken = JSON.parse(
        String(localStorage.getItem("auth-storage"))
      ).state.accessToken;

      if (accessToken) {
        try {
          const { data: user } = await axiosInstance.get("/users/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          useUserStore.getState().setUser(user);
        } catch (error) {}
      }
    };

    getMe();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#111827", // fundo
              color: "#F9FAFB", // texto
              border: "1px solid #1F2937", // borda
            },
            className: "!border-neutral-700 !text-white",
          }}
        />
      </body>
    </html>
  );
}
