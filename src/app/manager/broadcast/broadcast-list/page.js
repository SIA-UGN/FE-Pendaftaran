"use client"

import { useManagerNotifications } from "@/hooks/useManager";

export default function BroadcastList() {
  const { data, isLoading, isError, error } = useManagerNotifications();

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Error fetching applicant statistics:{" "}
        {error.response?.data?.message || error.message}
      </div>
    );

  console.log(data.data.data.data);

    return <>
  </>;
}
