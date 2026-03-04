import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getWatch, getRelatedWatches, formatPrice, formatMovementType, formatMaterial, formatWaterResistance, formatFrequency, formatDialColor } from "@/lib/watches";
import { watches } from "@/data/watches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import SpecBar from "@/components/SpecBar";

export function generateStaticParams() {
  return watches.map((w) => ({ id: w.id }));
}

export default async function WatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const watch = getWatch(id);
  if (!watch) notFound();

  const related = getRelatedWatches(watch, 4);
  const s = watch.specs;

  const specGroups = [
    {
      title: "Movement",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.204-.107-.397.165-.71.505-.78.929l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
      ),
      rows: [
        ["Type", formatMovementType(s.movementType)],
        ["Caliber", s.movementName],
        ["Power Reserve", `${s.powerReserve} hours`],
        ["Frequency", formatFrequency(s.frequency)],
        ["Jewels", s.jewels != null ? `${s.jewels}` : "N/A"],
        ["Hacking", s.hacking ? "Yes" : "No"],
        ["Hand-winding", s.handWinding ? "Yes" : "No"],
      ],
    },
    {
      title: "Case",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      ),
      rows: [
        ["Diameter", `${s.caseDiameter} mm`],
        ["Thickness", `${s.caseThickness} mm`],
        ["Material", formatMaterial(s.caseMaterial)],
        ["Case Back", formatMaterial(s.caseBack)],
        ["Crystal", formatMaterial(s.crystal)],
        ["Water Resistance", formatWaterResistance(s.waterResistance)],
      ],
    },
    {
      title: "Dial & Display",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      ),
      rows: [
        ["Dial Color", formatDialColor(s.dialColor)],
        ["Luminous", s.luminous ? "Yes" : "No"],
        ["Date", s.dateDisplay ? "Yes" : "No"],
        ["Day", s.dayDisplay ? "Yes" : "No"],
        ["Chronograph", s.chronograph ? "Yes" : "No"],
        ["GMT", s.gmtFunction ? "Yes" : "No"],
      ],
    },
    {
      title: "Strap / Bracelet",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      ),
      rows: [
        ["Type", formatMaterial(s.strapType)],
        ["Material", s.strapMaterial],
        ["Lug Width", `${s.lugWidth} mm`],
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-surface-sunken flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-text-tertiary mb-6">
            <Link href="/watches" className="hover:text-brand-600 transition-colors">Browse</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <Link href={`/watches?brand=${watch.brand}`} className="hover:text-brand-600 transition-colors">{watch.brand}</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="text-text-primary font-medium truncate">{watch.model}</span>
          </nav>

          {/* Hero card */}
          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-2/5 bg-surface-sunken flex items-center justify-center p-10 sm:p-16 relative min-h-[300px]">
                {watch.imageUrl ? (
                  <div className="relative w-full h-full min-h-[250px]">
                    <Image
                      src={watch.imageUrl}
                      alt={`${watch.brand} ${watch.model}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                    <p className="absolute bottom-0 left-0 right-0 text-center text-xs font-mono text-text-tertiary mt-4">Ref. {watch.reference}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-28 h-28 sm:w-36 sm:h-36 text-text-tertiary/30 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="text-xs font-mono text-text-tertiary mt-4">Ref. {watch.reference}</p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8 md:w-3/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{watch.brand}</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1 tracking-tight">{watch.model}</h1>
                    <p className="text-text-secondary mt-1">{watch.collection}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-3xl sm:text-4xl font-bold text-text-primary">{formatPrice(watch.price)}</p>
                  <p className="text-xs text-text-tertiary mt-1">Manufacturer suggested retail price</p>
                </div>

                {/* Quick spec badges */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <QuickBadge label={formatMovementType(s.movementType)} />
                  <QuickBadge label={`${s.caseDiameter}mm`} />
                  <QuickBadge label={`${s.powerReserve}h power reserve`} />
                  <QuickBadge label={formatWaterResistance(s.waterResistance)} />
                  <QuickBadge label={formatMaterial(s.crystal)} />
                  {s.chronograph && <QuickBadge label="Chronograph" accent />}
                  {s.gmtFunction && <QuickBadge label="GMT" accent />}
                  {s.caseBack === "exhibition" && <QuickBadge label="Exhibition case back" />}
                </div>

                {/* Spec bars */}
                <div className="mt-8 space-y-3">
                  <SpecBar label="Power Reserve" value={s.powerReserve} max={120} unit="h" highlight={s.powerReserve >= 70} />
                  <SpecBar label="Water Resistance" value={s.waterResistance} max={500} unit="m" highlight={s.waterResistance >= 200} />
                  <SpecBar label="Case Diameter" value={s.caseDiameter} max={50} unit="mm" />
                  <SpecBar label="Case Thickness" value={s.caseThickness} max={20} unit="mm" />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-8">
                  <Link
                    href={`/compare?ids=${watch.id}`}
                    className="inline-flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    Add to Compare
                  </Link>
                  <Link
                    href="/watches"
                    className="inline-flex items-center gap-2 bg-white text-text-primary px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-surface-sunken transition-colors border border-border"
                  >
                    Browse All
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Full Specs */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-text-primary mb-4">Full Specifications</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {specGroups.map((group) => (
                <div key={group.title} className="bg-white border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2.5 px-5 py-3 bg-surface-raised border-b border-border">
                    <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      {group.icon}
                    </svg>
                    <h3 className="font-semibold text-text-primary text-sm">{group.title}</h3>
                  </div>
                  <div className="divide-y divide-border-light">
                    {group.rows.map(([label, value]) => (
                      <div key={label} className="flex justify-between px-5 py-3">
                        <span className="text-sm text-text-secondary">{label}</span>
                        <span className="text-sm text-text-primary font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Watches */}
          {related.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">Similar Watches</h2>
                <Link href="/watches" className="text-sm text-brand-600 font-medium hover:text-brand-700">
                  View all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map((w) => (
                  <WatchCard key={w.id} watch={w} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function QuickBadge({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
      accent ? "bg-brand-50 text-brand-700 border border-brand-100" : "bg-surface-sunken text-text-secondary"
    }`}>
      {label}
    </span>
  );
}
