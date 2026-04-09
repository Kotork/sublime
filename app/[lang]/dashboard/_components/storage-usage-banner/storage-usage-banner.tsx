import { HardDrive, Database } from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { formatBytes } from "@/lib/format-bytes";
import {
  getStorageMetrics,
  type StorageMetrics,
} from "@/lib/dashboard/get-storage-metrics";
import { cn } from "@/lib/utils";

const USAGE_WARNING_THRESHOLD_PCT = 80;
const USAGE_CRITICAL_THRESHOLD_PCT = 95;

export type StorageUsageDict = {
  title: string;
  fileStorage: string;
  database: string;
  used: string;
  free: string;
  total: string;
  overLimit: string;
  unavailable: string;
  limitWarning80: string;
  limitWarning95: string;
  accountManagerEmail: string;
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

  const filePct =
    metrics.fileStorage.quotaBytes > 0
      ? (metrics.fileStorage.usedBytes / metrics.fileStorage.quotaBytes) * 100
      : 0;
  const dbPct =
    metrics.database.quotaBytes > 0
      ? (metrics.database.usedBytes / metrics.database.quotaBytes) * 100
      : 0;
  const maxUsagePct = Math.max(filePct, dbPct);
  const roundedPct = Math.round(maxUsagePct);
  const showCritical = maxUsagePct >= USAGE_CRITICAL_THRESHOLD_PCT;
  const showWarning =
    maxUsagePct >= USAGE_WARNING_THRESHOLD_PCT && !showCritical;

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
        {showCritical && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2.5 text-sm text-red-950 dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-50"
          >
            <p>
              {dict.limitWarning95.replace("{percent}", String(roundedPct))}{" "}
              <a
                href={`mailto:${dict.accountManagerEmail}`}
                className="font-medium text-red-900 underline underline-offset-2 hover:text-red-800 dark:text-red-100 dark:hover:text-white"
              >
                {dict.accountManagerEmail}
              </a>
            </p>
          </div>
        )}
        {showWarning && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-50"
          >
            <p>
              {dict.limitWarning80.replace("{percent}", String(roundedPct))}{" "}
              <a
                href={`mailto:${dict.accountManagerEmail}`}
                className="font-medium text-amber-900 underline underline-offset-2 hover:text-amber-800 dark:text-amber-100 dark:hover:text-white"
              >
                {dict.accountManagerEmail}
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
