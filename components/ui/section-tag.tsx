interface SectionTagProps {
  label: string;
}

export function SectionTag({ label }: SectionTagProps) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
      {label}
    </p>
  );
}
