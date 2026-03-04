"use client";

interface SpecBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  highlight?: boolean;
}

export default function SpecBar({ label, value, max, unit, highlight }: SpecBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-secondary font-medium">{label}</span>
        <span className={`text-xs font-semibold ${highlight ? "text-brand-600" : "text-text-primary"}`}>
          {value}{unit}
        </span>
      </div>
      <div className="h-1.5 bg-surface-sunken rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            highlight ? "bg-brand-500" : "bg-gray-300"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
