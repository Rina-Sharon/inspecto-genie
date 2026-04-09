import { cn } from "@/lib/utils";

type Status = "pass" | "fail" | "warning" | "pending" | "open" | "in-progress" | "closed";

const statusStyles: Record<Status, string> = {
  pass: "bg-secondary/15 text-secondary border-secondary/30",
  fail: "bg-destructive/15 text-destructive border-destructive/30",
  warning: "bg-accent/15 text-accent border-accent/30",
  pending: "bg-muted text-muted-foreground border-border",
  open: "bg-accent/15 text-accent border-accent/30",
  "in-progress": "bg-primary/15 text-primary border-primary/30",
  closed: "bg-secondary/15 text-secondary border-secondary/30",
};

const statusLabels: Record<Status, string> = {
  pass: "Pass",
  fail: "Fail",
  warning: "Warning",
  pending: "Pending",
  open: "Open",
  "in-progress": "In Progress",
  closed: "Closed",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        statusStyles[status]
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
