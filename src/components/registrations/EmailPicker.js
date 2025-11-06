"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function EmailPicker() {
  const emails = ["faradis@gmail.com", "gam@gmail.com", "mantap@gmail.com"];
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h2 className="text-3xl sm:text-2xl font-semibold w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-12">
        Email Pendaftar
      </h2>
      <p className="w-full">
        Pilih email yang nantinya akan Anda digunakan sebagai email mahasiswa!
      </p>

      <Card className="p-4 w-full gap-2">
        {emails.map((email, index) => (
          <div
            key={index}
            onClick={() => setSelected(email)}
            className={`cursor-pointer rounded-lg px-3 py-2 transition ${
              selected === email
                ? "bg-green-100 text-green-700 font-medium"
                : "hover:bg-gray-200"
            }`}
          >
            {email}
          </div>
        ))}
      </Card>

      {selected && (
        <p className="mt-3 text-sm text-gray-600">
          Email terpilih: <span className="font-semibold">{selected}</span>
        </p>
      )}
    </>
  );
}
