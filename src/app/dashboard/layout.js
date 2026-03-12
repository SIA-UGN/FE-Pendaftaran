"use client";

import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#f0f4f1', fontFamily: 'Urbanist, system-ui, sans-serif' }}
    >
      <Navbar />
      <main className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        {children}
      </main>
    </div>
  );
}