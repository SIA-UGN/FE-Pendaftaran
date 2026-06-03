"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { Eye, EyeOff, Shield, ShieldOff, Save, History, RotateCcw, Loader2, ChevronDown, ChevronUp, AlertTriangle, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import {
  useAdminSections,
  useBatchUpdateVisibility,
  useAdminSectionHistory,
  useAdminFields,
  useBatchUpdateFieldVisibility,
} from "@/hooks/useFormVisibility";

// ============================================================
// Helper: Switch component sederhana (tanpa dependency tambahan)
// ============================================================
function ToggleSwitch({ checked, onChange, disabled = false, colorOn = "bg-[#015023]", colorOff = "bg-gray-300" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#015023] ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${checked ? colorOn : colorOff}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ============================================================
// Sub-component: History Modal (Audit Log per Section)
// ============================================================
function SectionHistoryModal({ sectionId, sectionLabel }) {
  const { data: history = [], isLoading } = useAdminSectionHistory(sectionId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 text-xs text-gray-500 hover:text-[#015023]">
          <History className="w-3.5 h-3.5" />
          Riwayat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#015023]">Riwayat Perubahan</DialogTitle>
          <DialogDescription>
            Audit log untuk section <strong>{sectionLabel}</strong>
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#015023]" />
          </div>
        ) : history.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Belum ada riwayat perubahan.</p>
        ) : (
          <div className="space-y-3">
            {history.map((log, idx) => (
              <div key={log.id || idx} className="border rounded-lg p-3 text-sm bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-[#015023]">
                    {log.changed_by?.name || "System"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(log.created_at).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-gray-600">
                  <span>
                    Visible: {log.previous_visibility ? "✅" : "❌"} → {log.new_visibility ? "✅" : "❌"}
                  </span>
                  <span>
                    Required: {log.previous_required ? "✅" : "❌"} → {log.new_required ? "✅" : "❌"}
                  </span>
                </div>
                {log.reason && (
                  <p className="mt-1 text-xs text-gray-500 italic">Alasan: {log.reason}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// Sub-component: Expandable Field List per Section
// ============================================================
function FieldListPanel({ sectionId, sectionLabel }) {
  const { data: serverFields = [], isLoading, refetch } = useAdminFields(sectionId);
  const batchFieldMutation = useBatchUpdateFieldVisibility();

  const [localFields, setLocalFields] = useState([]);
  const [hasFieldChanges, setHasFieldChanges] = useState(false);

  // Sync dari server
  useEffect(() => {
    if (serverFields.length > 0) {
      setLocalFields(
        serverFields.map((f) => ({
          id: f.id,
          code: f.code,
          label: f.label,
          is_visible: f.is_visible,
          is_required: f.is_required,
          display_order: f.display_order,
        }))
      );
      setHasFieldChanges(false);
    }
  }, [serverFields]);

  const detectFieldChanges = useCallback(
    (updated) => {
      return updated.some((local) => {
        const original = serverFields.find((f) => f.id === local.id);
        if (!original) return false;
        return (
          local.is_visible !== original.is_visible ||
          local.is_required !== original.is_required
        );
      });
    },
    [serverFields]
  );

  const handleFieldToggle = (id, field) => {
    setLocalFields((prev) => {
      const updated = prev.map((f) =>
        f.id === id ? { ...f, [field]: !f[field] } : f
      );
      setHasFieldChanges(detectFieldChanges(updated));
      return updated;
    });
  };

  const handleFieldSave = () => {
    const changedFields = localFields
      .filter((local) => {
        const original = serverFields.find((f) => f.id === local.id);
        return (
          original &&
          (local.is_visible !== original.is_visible ||
            local.is_required !== original.is_required)
        );
      })
      .map((f) => ({
        id: f.id,
        is_visible: f.is_visible,
        is_required: f.is_required,
      }));

    if (changedFields.length === 0) return;

    batchFieldMutation.mutate(
      { fields: changedFields },
      {
        onSuccess: () => {
          setHasFieldChanges(false);
          refetch();
        },
      }
    );
  };

  const handleFieldReset = () => {
    setLocalFields(
      serverFields.map((f) => ({
        id: f.id,
        code: f.code,
        label: f.label,
        is_visible: f.is_visible,
        is_required: f.is_required,
        display_order: f.display_order,
      }))
    );
    setHasFieldChanges(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6 bg-[#f8faf9]">
        <Loader2 className="w-5 h-5 animate-spin text-[#015023]" />
        <span className="ml-2 text-sm text-gray-500">Memuat field...</span>
      </div>
    );
  }

  if (localFields.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-gray-400 bg-[#f8faf9]">
        Belum ada field yang terdaftar untuk section <strong>{sectionLabel}</strong>.
      </div>
    );
  }

  return (
    <div className="bg-[#f8faf9] border-t border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <span className="text-xs font-semibold text-[#015023] uppercase tracking-wide flex items-center gap-1.5">
          <List className="w-3.5 h-3.5" />
          Field — {sectionLabel}
        </span>
        {hasFieldChanges && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFieldReset}
              className="text-xs h-7"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleFieldSave}
              disabled={batchFieldMutation.isPending}
              className="text-xs h-7 bg-[#015023] hover:bg-[#013d1a] text-white"
            >
              {batchFieldMutation.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
              ) : (
                <Save className="w-3 h-3 mr-1" />
              )}
              Simpan Field
            </Button>
          </div>
        )}
      </div>
      <div className="divide-y divide-gray-100">
        {localFields.map((field) => {
          const original = serverFields.find((f) => f.id === field.id);
          const changed =
            original &&
            (field.is_visible !== original.is_visible ||
              field.is_required !== original.is_required);

          return (
            <div
              key={field.id}
              className={`px-6 py-2.5 flex items-center justify-between transition-colors duration-150 ${
                changed ? "bg-amber-50/60" : "hover:bg-white/60"
              } ${!field.is_visible ? "opacity-60" : ""}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge variant="outline" className="font-mono text-[10px] shrink-0 border-gray-300 text-gray-500">
                  {field.code}
                </Badge>
                <span className="text-sm text-gray-700 truncate">{field.label}</span>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-10 text-right">
                    {field.is_visible ? "Show" : "Hide"}
                  </span>
                  <ToggleSwitch
                    checked={field.is_visible}
                    onChange={() => handleFieldToggle(field.id, "is_visible")}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-12 text-right">
                    {field.is_required ? "Wajib" : "Opsional"}
                  </span>
                  <ToggleSwitch
                    checked={field.is_required}
                    onChange={() => handleFieldToggle(field.id, "is_required")}
                    colorOn="bg-[#DABC4E]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Main Page Component
// ============================================================
export default function FormVisibilityPage() {
  const { data: sections = [], isLoading, refetch } = useAdminSections();
  const batchMutation = useBatchUpdateVisibility();

  // Local state untuk staging section-level changes
  const [localSections, setLocalSections] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveReason, setSaveReason] = useState("");
  // Track which sections have expanded field panels
  const [expandedSections, setExpandedSections] = useState(new Set());

  useEffect(() => {
    if (sections.length > 0) {
      setLocalSections(
        sections.map((s) => ({
          id: s.id,
          code: s.code,
          label: s.label,
          description: s.description,
          is_visible: s.is_visible,
          is_required: s.is_required,
          display_order: s.display_order,
          id_program: s.id_program,
        }))
      );
      setHasChanges(false);
    }
  }, [sections]);

  const detectChanges = useCallback(
    (updated) => {
      if (sections.length === 0) return false;
      return updated.some((local) => {
        const original = sections.find((s) => s.id === local.id);
        if (!original) return false;
        return (
          local.is_visible !== original.is_visible ||
          local.is_required !== original.is_required
        );
      });
    },
    [sections]
  );

  const handleToggle = (id, field) => {
    setLocalSections((prev) => {
      const updated = prev.map((s) =>
        s.id === id ? { ...s, [field]: !s[field] } : s
      );
      setHasChanges(detectChanges(updated));
      return updated;
    });
  };

  const handleReset = () => {
    setLocalSections(
      sections.map((s) => ({
        id: s.id,
        code: s.code,
        label: s.label,
        description: s.description,
        is_visible: s.is_visible,
        is_required: s.is_required,
        display_order: s.display_order,
        id_program: s.id_program,
      }))
    );
    setHasChanges(false);
    setSaveReason("");
  };

  const handleBatchSave = () => {
    const changedSections = localSections
      .filter((local) => {
        const original = sections.find((s) => s.id === local.id);
        return (
          original &&
          (local.is_visible !== original.is_visible ||
            local.is_required !== original.is_required)
        );
      })
      .map((s) => ({
        id: s.id,
        is_visible: s.is_visible,
        is_required: s.is_required,
      }));

    if (changedSections.length === 0) {
      toast("Tidak ada perubahan untuk disimpan.", { icon: "ℹ️" });
      return;
    }

    batchMutation.mutate(
      {
        sections: changedSections,
        reason: saveReason || "Batch update via Admin UI",
      },
      {
        onSuccess: () => {
          setHasChanges(false);
          setSaveReason("");
          refetch();
        },
      }
    );
  };

  const toggleExpandSection = (id) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const hiddenCount = localSections.filter((s) => !s.is_visible).length;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        {/* ========== Header ========== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#015023", fontFamily: "Urbanist, sans-serif" }}>
              Form Visibility
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola tampilan section &amp; field formulir pendaftaran. Perubahan langsung berlaku untuk portal pendaftar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasChanges && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      className="gap-1.5 bg-[#015023] hover:bg-[#013d1a] text-white"
                      disabled={batchMutation.isPending}
                    >
                      {batchMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Simpan Perubahan
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Simpan Perubahan Visibility?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Perubahan ini akan langsung berpengaruh pada portal pendaftaran.
                        Section yang dinonaktifkan tidak akan muncul untuk pendaftar.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-3 py-2">
                      <label className="text-sm font-medium text-gray-700">
                        Alasan perubahan (opsional):
                      </label>
                      <Textarea
                        placeholder="Contoh: Menonaktifkan section prestasi untuk gelombang 2..."
                        value={saveReason}
                        onChange={(e) => setSaveReason(e.target.value)}
                        rows={2}
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleBatchSave}
                        className="bg-[#015023] hover:bg-[#013d1a] text-white"
                      >
                        Ya, Simpan
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>

        {/* ========== Warning Bubble ========== */}
        {hiddenCount > 0 && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <strong>{hiddenCount} section</strong> saat ini dinonaktifkan.
              Pendaftar tidak akan melihat langkah-langkah tersebut di portal pendaftaran.
            </div>
          </div>
        )}

        {/* ========== Section Table + Expandable Fields ========== */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg" style={{ color: "#015023" }}>
              Daftar Section &amp; Field
            </CardTitle>
            <CardDescription>
              Toggle visibility dan required status. Klik baris section untuk mengelola field di dalamnya.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-[#015023]" />
                <span className="ml-3 text-gray-500">Memuat data section...</span>
              </div>
            ) : localSections.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                Belum ada section yang terdaftar.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-10 text-center">#</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead className="text-center">Code</TableHead>
                    <TableHead className="text-center">Visible</TableHead>
                    <TableHead className="text-center">Required</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localSections.map((section, idx) => {
                    const original = sections.find((s) => s.id === section.id);
                    const visibilityChanged = original && section.is_visible !== original.is_visible;
                    const requiredChanged = original && section.is_required !== original.is_required;
                    const rowChanged = visibilityChanged || requiredChanged;
                    const isExpanded = expandedSections.has(section.id);

                    return (
                      <Fragment key={section.id}>
                        <TableRow
                          className={`transition-colors duration-200 cursor-pointer ${
                            rowChanged
                              ? "bg-amber-50 border-l-4 border-l-amber-400"
                              : "hover:bg-gray-50"
                          } ${!section.is_visible ? "opacity-70" : ""} ${
                            isExpanded ? "bg-[#E6EEE9]/40" : ""
                          }`}
                          onClick={() => toggleExpandSection(section.id)}
                        >
                          <TableCell className="text-center text-sm text-gray-400 font-mono">
                            {section.display_order || idx + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-[#015023] shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                              )}
                              <div className="flex flex-col gap-0.5">
                                <span className="font-semibold text-sm" style={{ color: "#015023" }}>
                                  {section.label}
                                </span>
                                {section.description && (
                                  <span className="text-xs text-gray-400 line-clamp-1">
                                    {section.description}
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                              style={{ borderColor: "#015023", color: "#015023" }}
                            >
                              {section.code}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col items-center gap-1">
                              <ToggleSwitch
                                checked={section.is_visible}
                                onChange={() => handleToggle(section.id, "is_visible")}
                              />
                              <span className="text-[10px] text-gray-400">
                                {section.is_visible ? (
                                  <span className="flex items-center gap-0.5 text-[#015023]">
                                    <Eye className="w-3 h-3" /> Aktif
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-0.5 text-red-400">
                                    <EyeOff className="w-3 h-3" /> Nonaktif
                                  </span>
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col items-center gap-1">
                              <ToggleSwitch
                                checked={section.is_required}
                                onChange={() => handleToggle(section.id, "is_required")}
                                colorOn="bg-[#DABC4E]"
                              />
                              <span className="text-[10px] text-gray-400">
                                {section.is_required ? (
                                  <span className="flex items-center gap-0.5 text-[#DABC4E]">
                                    <Shield className="w-3 h-3" /> Wajib
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-0.5 text-gray-400">
                                    <ShieldOff className="w-3 h-3" /> Opsional
                                  </span>
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                            <SectionHistoryModal
                              sectionId={section.id}
                              sectionLabel={section.label}
                            />
                          </TableCell>
                        </TableRow>

                        {/* Expandable Field Panel */}
                        {isExpanded && (
                          <TableRow>
                            <TableCell colSpan={6} className="p-0">
                              <FieldListPanel
                                sectionId={section.id}
                                sectionLabel={section.label}
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* ========== Info Footer ========== */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>💡 Tips:</strong>
          <ul className="mt-1 list-disc list-inside space-y-0.5">
            <li>Perubahan <strong>section</strong> ditampung hingga Anda tekan &quot;Simpan Perubahan&quot;.</li>
            <li>Perubahan <strong>field</strong> disimpan terpisah per section (klik baris untuk expand).</li>
            <li>Nonaktifkan section → semua field di dalamnya otomatis tersembunyi dari pendaftar.</li>
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
}
