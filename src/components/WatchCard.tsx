"use client";

import Link from "next/link";
import Image from "next/image";
import { Watch } from "@/lib/types";
import { formatPrice, formatMovementType } from "@/lib/watches";

function WatchImage({ watch, className, iconSize = "w-10 h-10" }: { watch: Watch; className?: string; iconSize?: string }) {
  if (watch.imageUrl) {
    return (
      <Image
        src={watch.imageUrl}
        alt={`${watch.brand} ${watch.model}`}
        fill
        className={`object-contain p-2 ${className || ""}`}
        sizes="(max-width: 640px) 50vw, 300px"
      />
    );
  }
  return (
    <svg className={`${iconSize} text-text-tertiary/50`} fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

interface WatchCardProps {
  watch: Watch;
  onCompare?: (watch: Watch) => void;
  isInCompare?: boolean;
  layout?: "grid" | "list";
}

export default function WatchCard({
  watch,
  onCompare,
  isInCompare,
  layout = "grid",
}: WatchCardProps) {
  const s = watch.specs;

  if (layout === "list") {
    return (
      <div className="group bg-white border border-border rounded-xl hover:shadow-md hover:border-brand-200 transition-all duration-200">
        <div className="flex items-center gap-4 sm:gap-6 p-4">
          {/* Image */}
          <Link href={`/watch/${watch.id}`} className="shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-sunken rounded-xl flex items-center justify-center group-hover:bg-brand-50 transition-colors relative overflow-hidden">
              <WatchImage watch={watch} iconSize="w-10 h-10" />
            </div>
          </Link>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{watch.brand}</p>
                <Link href={`/watch/${watch.id}`}>
                  <h3 className="font-semibold text-text-primary mt-0.5 group-hover:text-brand-700 transition-colors truncate">
                    {watch.model}
                  </h3>
                </Link>
                <p className="text-sm text-text-tertiary mt-0.5">{watch.collection} &middot; Ref. {watch.reference}</p>
              </div>
              <p className="text-lg font-bold text-text-primary shrink-0">
                {formatPrice(watch.price)}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <SpecBadge>{formatMovementType(s.movementType)}</SpecBadge>
              <SpecBadge>{s.caseDiameter}mm</SpecBadge>
              <SpecBadge>{s.powerReserve}h PR</SpecBadge>
              <SpecBadge>{s.waterResistance}m WR</SpecBadge>
              {s.crystal === "sapphire" && <SpecBadge accent>Sapphire</SpecBadge>}
              {s.chronograph && <SpecBadge accent>Chrono</SpecBadge>}
              {s.gmtFunction && <SpecBadge accent>GMT</SpecBadge>}
              {onCompare && (
                <button
                  onClick={() => onCompare(watch)}
                  className={`ml-auto text-xs font-medium px-3 py-1 rounded-lg transition-all ${
                    isInCompare
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-surface-sunken text-text-secondary hover:bg-brand-50 hover:text-brand-600"
                  }`}
                >
                  {isInCompare ? "Added" : "+ Compare"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-brand-200 transition-all duration-200">
      <Link href={`/watch/${watch.id}`}>
        <div className="aspect-square bg-surface-sunken flex items-center justify-center p-4 group-hover:bg-brand-50 transition-colors relative overflow-hidden">
          <WatchImage watch={watch} iconSize="w-20 h-20" />
          <span className="absolute bottom-3 left-3 text-[10px] font-mono text-text-tertiary bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded z-10">
            {watch.reference}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider">
          {watch.brand}
        </p>
        <Link href={`/watch/${watch.id}`}>
          <h3 className="font-semibold text-text-primary mt-1 leading-snug group-hover:text-brand-700 transition-colors line-clamp-2">
            {watch.model}
          </h3>
        </Link>
        <p className="text-xs text-text-tertiary mt-1">{watch.collection}</p>

        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          <SpecBadge>{formatMovementType(s.movementType)}</SpecBadge>
          <SpecBadge>{s.caseDiameter}mm</SpecBadge>
          <SpecBadge>{s.waterResistance}m</SpecBadge>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-light">
          <span className="text-lg font-bold text-text-primary">
            {formatPrice(watch.price)}
          </span>
          {onCompare && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onCompare(watch);
              }}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                isInCompare
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-surface-sunken text-text-secondary hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              {isInCompare ? "Added" : "+ Compare"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SpecBadge({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
        accent
          ? "bg-brand-50 text-brand-700"
          : "bg-surface-sunken text-text-secondary"
      }`}
    >
      {children}
    </span>
  );
}
