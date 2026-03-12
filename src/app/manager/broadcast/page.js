"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCreateBroadcastNotification, useManagerNotifications } from "@/hooks/useManager";
import { useState, useMemo } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Send, Users, Plus, SearchIcon, MoreVertical, Calendar, User2,
} from "lucide-react";

const FormSchema = z.object({
  targetAudience: z.string().min(1, {
    message: "Target Audience wajib dipilih.",
  }),
  messageTitle: z.string().min(3, {
    message: "Judul pesan harus memiliki setidaknya 3 karakter.",
  }),
  messageContent: z.string().min(10, {
    message: "Isi pesan harus memiliki setidaknya 10 karakter.",
  }),
  scheduleDate: z.string().min(1, {
    message: "Tanggal pengiriman wajib diisi.",
  }),
});

const targetLabels = {
  all_applicants: "Semua Pendaftar",
  pending_applicants: "Menunggu",
  approved_applicants: "Disetujui",
  rejected_applicants: "Ditolak",
};

export default function BroadcastMessage() {
  const router = useRouter();
  const { mutate: setBroadcast, isLoading: isBroadcastLoading } =
    useCreateBroadcastNotification();
  const { data: notifData } = useManagerNotifications({ per_page: 50 });

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const notifications = useMemo(() => {
    const list = notifData?.data?.data?.data || notifData?.data?.data || [];
    return Array.isArray(list) ? list : [];
  }, [notifData]);

  // Stats computed from notifications
  const totalSent = notifications.filter((n) => n.type !== "draft").length;
  const totalDraft = notifications.filter((n) => n.type === "draft").length;
  const totalRecipients = notifications.reduce((sum, n) => sum + (n.recipients_count || 0), 0);

  const filteredNotifications = useMemo(() => {
    if (!search) return notifications;
    const q = search.toLowerCase();
    return notifications.filter((n) =>
      n.title?.toLowerCase().includes(q) || n.message?.toLowerCase().includes(q)
    );
  }, [notifications, search]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      targetAudience: "all_applicants",
      messageTitle: "",
      messageContent: "",
      scheduleDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data) => {
    const statusMap = {
      all_applicants: null,
      pending_applicants: "submitted",
      approved_applicants: "approved",
      rejected_applicants: "rejected",
    };

    const payload = {
      title: data.messageTitle,
      message: data.messageContent,
      type: "info",
    };

    const mappedStatus = statusMap[data.targetAudience];
    if (mappedStatus) {
      payload.registration_status = mappedStatus;
    }

    setBroadcast(payload, {
      onSuccess: () => {
        setShowForm(false);
        form.reset();
      },
    });
  };

  const statCards = [
    { label: "Total Broadcast", value: totalSent, sub: "Pesan terkirim bulan ini", icon: Send, borderColor: "#015023" },
    { label: "Draft Tersimpan", value: totalDraft, sub: "Belum dikirim", icon: Send, borderColor: "#DABC4E" },
    { label: "Total Penerima", value: totalRecipients, sub: "Email terkirim total", icon: Users, borderColor: "#dc2626" },
  ];

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 sm:p-5 border-2 transition-all hover:shadow-md"
              style={{ borderColor: card.borderColor }}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{card.label}</p>
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${card.borderColor}15` }}>
                  <card.icon size={18} style={{ color: card.borderColor }} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: card.borderColor }}>{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        {!showForm && (
          <div className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: '#E6EEE9' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#015023' }}>Riwayat Broadcast</h2>
                <p className="text-xs text-gray-400">Kelola dan kirim broadcast email ke pendaftar</p>
              </div>
              <Button
                className="flex items-center gap-2 text-sm font-semibold rounded-xl"
                style={{ backgroundColor: '#015023', color: '#fff' }}
                onClick={() => setShowForm(true)}
              >
                <Plus size={16} /> Buat Broadcast Baru
              </Button>
            </div>

            {/* Search */}
            <div className="border border-gray-200 rounded-lg mb-4">
              <InputGroup className="w-full">
                <InputGroupAddon><SearchIcon className="text-gray-400 w-4 h-4" /></InputGroupAddon>
                <InputGroupInput
                  placeholder="Cari broadcast..."
                  className="text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </div>

            {/* Notification List */}
            <div className="space-y-3">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif, i) => (
                  <div
                    key={notif.id || i}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-semibold text-sm text-gray-800 truncate">{notif.title}</h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            notif.type === "draft"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {notif.type === "draft" ? "Draft" : "Terkirim"}
                        </span>
                        {notif.registration_status && (
                          <span className="text-xs text-gray-400">
                            {targetLabels[`${notif.registration_status}_applicants`] || notif.registration_status}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1 mb-2">{notif.message}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <User2 size={11} /> {notif.recipients_count || 0} penerima
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {notif.created_at ? new Date(notif.created_at).toLocaleString("id-ID") : "-"}
                        </span>
                        {notif.id && <span>ID: BC{String(notif.id).padStart(3, "0")}</span>}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full flex-shrink-0" style={{ backgroundColor: '#015023' }}>
                      <MoreVertical size={14} className="text-white" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  {search ? `Tidak ada hasil untuk "${search}"` : "Belum ada broadcast"}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: '#E6EEE9' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#015023' }}>Buat Broadcast Baru</h2>
                <p className="text-xs text-gray-400">Kirim notifikasi ke pendaftar</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="text-sm text-gray-400">
                Batal
              </Button>
            </div>

            <Form {...form}>
              <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih target audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all_applicants">Semua Pendaftar</SelectItem>
                          <SelectItem value="pending_applicants">Pendaftar Pending</SelectItem>
                          <SelectItem value="approved_applicants">Pendaftar Diterima</SelectItem>
                          <SelectItem value="rejected_applicants">Pendaftar Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="messageTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Pesan</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Pengumuman Penting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="messageContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Isi Pesan</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tulis isi pesan Anda di sini..." className="bg-white min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="scheduleDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Pengiriman</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="w-full sm:w-auto">
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isBroadcastLoading}
                    className="w-full sm:w-auto"
                    style={{ backgroundColor: '#015023' }}
                  >
                    {isBroadcastLoading ? "Mengirim..." : "Kirim Broadcast"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
