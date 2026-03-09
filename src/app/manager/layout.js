"use client";

import Navbar from "@/components/layout/Navbar";

export default function ManagerLayout({ children }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#E6EEE9', fontFamily: 'Urbanist, system-ui, sans-serif' }}
    >
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
