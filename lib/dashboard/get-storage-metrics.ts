import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

const GB = 1024 * 1024 * 1024;

function envGb(key: string, fallback: number): number {
  const raw = process.env[key];
  if (!raw) return fallback;
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export type StorageMetrics = {
  fileStorage: { usedBytes: number; quotaBytes: number };
  database: { usedBytes: number; quotaBytes: number };
};

export async function getStorageMetrics(): Promise<StorageMetrics | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.rpc(
      "get_dashboard_storage_metrics",
    );

    if (error || !data) return null;

    const raw = data as {
      file_storage_bytes: number;
      database_bytes: number;
    };

    return {
      fileStorage: {
        usedBytes: raw.file_storage_bytes ?? 0,
        quotaBytes: envGb("SUPABASE_FILE_STORAGE_QUOTA_GB", 1) * GB,
      },
      database: {
        usedBytes: raw.database_bytes ?? 0,
        quotaBytes: envGb("SUPABASE_DATABASE_DISK_QUOTA_GB", 0.5) * GB,
      },
    };
  } catch {
    return null;
  }
}
