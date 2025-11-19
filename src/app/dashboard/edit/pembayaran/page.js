"use client";

import { Heading } from "@/components/Heading";
import { PaymentMethodList } from "@/components/dashboard/PaymentMethodList";
import { usePayments } from "@/hooks/usePayment";

export default function Page() {
  const params = { page: 1, per_page: 15 };

  const {
    data: paymentMethodData,
    isLoading,
    isError,
    error,
  } = usePayments(params);

  if (isLoading) <div>Is Loading....</div>;
  if (isError) <div>Error : {error.message}</div>;

  const data = paymentMethodData;

  console.log(data);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Heading title="Menambah Metode Pembayaran" />
      {/* <PaymentMethodList data={data}/> */}
    </div>
  );
}
