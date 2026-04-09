import { HardDrive, Database } from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { formatBytes } from "@/lib/format-bytes";
import {
  getStorageMetrics,
  type StorageMetrics,
} from "@/lib/dashboard/get-storage-metrics";
import { cn } from "@/lib/utils";

export type StorageUsageDict = {
  title: string;
  fileStorage: string;
  database: string;
  used: string;
  free: string;
  total: string;
  overLimit: string;
  unavailable: string;
};

function UsageRow({
  icon,
  label,
  usedBytes,
  quotaBytes,
  dict,
}: {
  icon: React.ReactNode;
  label: string;
  usedBytes: number;
  quotaBytes: number;
  dict: StorageUsageDict;
}) {
  const pct = quotaBytes > 0 ? (usedBytes / quotaBytes) * 100 : 0;
  const clamped = Math.min(pct, 100);
  const freeBytes = Math.max(0, quotaBytes - usedBytes);
  const isOver = usedBytes > quotaBytes;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-medium">
          {icon}
          {label}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {formatBytes(usedBytes)} / {formatBytes(quotaBytes)}
          {isOver && (
            <span className="ml-1 text-destructive font-medium">
              ({dict.overLimit})
            </span>
          )}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isOver ? "bg-destructive" : "bg-primary",
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
        <span>
          {dict.used}: {formatBytes(usedBytes)}
        </span>
        <span>
          {dict.free}: {formatBytes(freeBytes)}
        </span>
      </div>
    </div>
  );
}

export async function StorageUsageBanner({
  dict,
}: {
  dict: StorageUsageDict;
}) {
  let metrics: StorageMetrics | null = null;
  try {
    metrics = await getStorageMetrics();
  } catch {
    /* handled below */
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent className="py-3 px-4 text-sm text-muted-foreground">
          {dict.unavailable}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="py-3 px-4">
        <p className="mb-3 text-sm font-semibold">{dict.title}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <UsageRow
            icon={<HardDrive className="size-3.5" />}
            label={dict.fileStorage}
            usedBytes={metrics.fileStorage.usedBytes}
            quotaBytes={metrics.fileStorage.quotaBytes}
            dict={dict}
          />
          <UsageRow
            icon={<Database className="size-3.5" />}
            label={dict.database}
            usedBytes={metrics.database.usedBytes}
            quotaBytes={metrics.database.quotaBytes}
            dict={dict}
          />
        </div>
      </CardContent>
    </Card>
  );
}
