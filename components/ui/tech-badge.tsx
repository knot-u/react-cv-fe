interface TechBadgeProps {
  label: string;
}

export function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="rounded-full border border-border-strong bg-surface px-3 py-1 text-xs font-medium text-foreground">
      {label}
    </span>
  );
}
