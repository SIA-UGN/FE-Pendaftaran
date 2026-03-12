"use client";

import EditHeader from "@/components/admin/EditHeader";

export default function Layout({ children }) {
    return (
        <div className="space-y-6">
            <EditHeader />
            <main>{children}</main>
        </div>
    )
}