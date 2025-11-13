"use client";

import EditHeader from "@/components/admin/EditHeader";

export default function Layout({ children }) {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <main>
                <EditHeader />
                {children}
            </main>
        </div>
    )
}