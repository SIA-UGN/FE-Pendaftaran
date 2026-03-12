"use client";

import PaymentMethodList from "@/components/dashboard/PaymentMethodList";
import { usePaymentMethods } from "@/hooks/usePaymentMethod";
import { WalletMinimal } from "lucide-react";

export default function Page() {
  const {
    data: paymentMethodData,
    isLoading,
    isError,
    error,
  } = usePaymentMethods();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border p-6 animate-pulse" style={{ borderColor: '#E6EEE9' }}>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) return (
    <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E6EEE9' }}>
      <p className="text-red-600">Error: {error.message}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6EEE9' }}>
            <WalletMinimal className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#015023' }}>Metode Pembayaran</h2>
            <p className="text-xs text-gray-400">Kelola metode pembayaran yang tersedia</p>
          </div>
        </div>
        <PaymentMethodList data={paymentMethodData} />
      </div>
    </div>
  );
}
