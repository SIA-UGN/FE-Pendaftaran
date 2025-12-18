"use client";

import { Heading } from "@/components/Heading";
import PaymentMethodList from "@/components/dashboard/PaymentMethodList";
import { usePaymentMethods } from "@/hooks/usePaymentMethod";

export default function Page() {
  const params = { per_page: 15 };

  const {
    data: paymentMethodData,
    isLoading,
    isError,
    error,
  } = usePaymentMethods();

  if (isLoading) return <div>Is Loading....</div>;
  if (isError) return <div>Error : {error.message}</div>;

  const data = paymentMethodData;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Heading title="Menambah Metode Pembayaran" />
      <PaymentMethodList data={data} />
    </div>
  );
}
