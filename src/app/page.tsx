import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { watches } from "@/data/watches";
import { BRANDS } from "@/lib/constants";
import { formatPrice, formatMovementType } from "@/lib/watches";

export default function HomePage() {
  const brandCount = new Set(watches.map((w) => w.brand)).size;
  const specCount = 22;

  const featured = [
    watches.find((w) => w.id === "tissot-prx-powermatic-80")!,
    watches.find((w) => w.id === "seiko-prospex-spb143")!,
    watches.find((w) => w.id === "hamilton-khaki-field-murph-38")!,
    watches.find((w) => w.id === "orient-bambino-v2-cream")!,
    watches.find((w) => w.id === "citizen-promaster-diver-bn0150")!,
  ].filter(Boolean);

  const popularComparisons = [
    {
      watches: ["tissot-prx-powermatic-80", "hamilton-khaki-field-auto-42"],
      title: "Tissot PRX vs Hamilton Khaki Field",
      subtitle: "Dressy integrated bracelet vs rugged field watch",
    },
    {
      watches: ["seiko-presage-cocktail-time", "orient-bambino-v2-cream"],
      title: "Seiko Cocktail Time vs Orient Bambino",
      subtitle: "Two Japanese dress watch legends head to head",
    },
    {
      watches: ["seiko-prospex-spb143", "citizen-promaster-diver-bn0150"],
      title: "Seiko Prospex vs Citizen Promaster Diver",
      subtitle: "Automatic vs Eco-Drive dive watch showdown",
    },
    {
      watches: ["hamilton-intra-matic-auto-chrono", "tissot-prx-auto-chrono"],
      title: "Hamilton Intra-Matic vs Tissot PRX Chrono",
      subtitle: "Retro panda dial vs modern sports chrono",
    },
    {
      watches: ["orient-kamasu-green", "seiko-5-sports-srpd55"],
      title: "Orient Kamasu vs Seiko 5 Sports Diver",
      subtitle: "In-house diver vs iconic affordable sport watch",
    },
    {
      watches: ["citizen-promaster-navihawk-at-jy8078", "tissot-t-touch-connect-sport"],
      title: "Citizen Navihawk vs Tissot T-Touch",
      subtitle: "Aviation multi-function quartz face-off",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-surface-sunken" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-brand-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
              {watches.length} watches from {brandCount} brands
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight">
              Compare mechanical watches{" "}
              <span className="text-brand-600">across every brand</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Brands describe the same specs differently. We normalize everything
              into one standard so you can compare Hamilton, Tissot, Seiko,
              Orient, and Citizen side by side — apples to apples.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/watches"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm shadow-brand-600/20"
              >
                Browse All Watches
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 bg-white text-text-primary px-6 py-3 rounded-xl font-medium hover:bg-surface-sunken transition-colors border border-border"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                Compare Watches
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-surface-raised">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <Stat value={watches.length.toString()} label="Watches" />
          <Stat value={brandCount.toString()} label="Brands" />
          <Stat value={`${specCount}`} label="Normalized Specs" />
          <Stat value="3" label="Compare Slots" />
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            The problem with watch specs
          </h2>
          <p className="mt-3 text-text-secondary">
            Every brand describes specifications in their own way. This makes cross-brand comparison nearly impossible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-red-50/50 border border-red-200/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="font-semibold text-red-900">Without WatchCompare</h3>
            </div>
            <div className="space-y-2.5 text-sm text-red-800/80">
              <div className="bg-white/60 rounded-lg p-3 font-mono text-xs">
                <p className="text-red-400 mb-1">Hamilton:</p>
                <p>Movement: H-10, <span className="text-red-500 font-semibold">Automatic with self-winding</span></p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 font-mono text-xs">
                <p className="text-red-400 mb-1">Tissot:</p>
                <p>Caliber: Powermatic 80, <span className="text-red-500 font-semibold">Mechanical automatic</span></p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 font-mono text-xs">
                <p className="text-red-400 mb-1">Seiko:</p>
                <p>Caliber: 4R35, <span className="text-red-500 font-semibold">Self-winding (with manual)</span></p>
              </div>
              <p className="text-red-700 text-xs font-medium pt-1">Same type of movement. Three different descriptions.</p>
            </div>
          </div>

          <div className="bg-green-50/50 border border-green-200/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-semibold text-green-900">With WatchCompare</h3>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="bg-white/60 rounded-lg p-3 font-mono text-xs">
                <p className="text-green-400 mb-1">All three watches:</p>
                <p>Movement Type: <span className="text-green-700 font-semibold">Automatic</span></p>
                <p>Hand-winding: <span className="text-green-700 font-semibold">Yes</span></p>
                <p>Hacking: <span className="text-green-700 font-semibold">Yes</span></p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 font-mono text-xs">
                <p className="text-green-400 mb-1">Differences highlighted:</p>
                <p>Power Reserve: <span className="text-amber-600 font-semibold bg-amber-50 px-1 rounded">80h vs 80h vs 41h</span></p>
                <p>Frequency: <span className="text-green-700 font-semibold">21,600 vph (all same)</span></p>
              </div>
              <p className="text-green-700 text-xs font-medium pt-1">Standardized. Comparable. Filterable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface-sunken border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Built for watch enthusiasts
            </h2>
            <p className="mt-3 text-text-secondary">
              Every feature designed around how watch buyers actually research and compare.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />}
              title="Unified Spec Schema"
              description="22 normalized data points per watch. Movement type, power reserve, water resistance — all standardized across brands."
            />
            <FeatureCard
              icon={<path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />}
              title="Advanced Filters"
              description="Filter by movement, case size, price, crystal type, water resistance, strap, and more — simultaneously across all brands."
            />
            <FeatureCard
              icon={<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />}
              title="Side-by-Side Compare"
              description="Pick any 2-3 watches from any brands. Differences are highlighted automatically so you see what matters."
            />
            <FeatureCard
              icon={<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />}
              title="Instant Search"
              description="Search by model name, brand, collection, reference number, or movement caliber. Results appear instantly."
            />
            <FeatureCard
              icon={<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />}
              title="Related Watches"
              description="Every detail page shows similar models based on specs, price, and style — discover options you hadn't considered."
            />
            <FeatureCard
              icon={<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />}
              title="Brand Profiles"
              description="Learn about each brand's heritage, parent company, country, and browse their full collection in one place."
            />
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Popular comparisons
          </h2>
          <p className="mt-3 text-text-secondary">
            These are the matchups watch buyers debate most. See the specs head-to-head.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {popularComparisons.map((comp, i) => (
            <Link
              key={i}
              href={`/compare?ids=${comp.watches.join(",")}`}
              className="group bg-white border border-border rounded-xl p-5 hover:shadow-md hover:border-brand-200 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {comp.watches.slice(0, 2).map((wId) => {
                    const w = watches.find((x) => x.id === wId);
                    return (
                      <div key={wId} className="w-10 h-10 rounded-full bg-surface-sunken border-2 border-white flex items-center justify-center relative overflow-hidden">
                        {w?.imageUrl ? (
                          <Image src={w.imageUrl} alt={w.model} fill className="object-contain p-0.5" sizes="40px" />
                        ) : (
                          <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
                <svg className="w-4 h-4 text-text-tertiary group-hover:text-brand-500 transition-colors ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary text-sm group-hover:text-brand-700 transition-colors">
                {comp.title}
              </h3>
              <p className="text-xs text-text-tertiary mt-1">{comp.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Watches */}
      <section className="bg-surface-sunken border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Featured watches
              </h2>
              <p className="mt-2 text-text-secondary">Popular models worth checking out.</p>
            </div>
            <Link href="/watches" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-brand-600 font-medium hover:text-brand-700">
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {featured.map((watch) => (
              <Link key={watch.id} href={`/watch/${watch.id}`} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all">
                <div className="aspect-[4/3] bg-surface-sunken flex items-center justify-center group-hover:bg-brand-50 transition-colors relative overflow-hidden">
                  {watch.imageUrl ? (
                    <Image src={watch.imageUrl} alt={`${watch.brand} ${watch.model}`} fill className="object-contain p-3" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" />
                  ) : (
                    <svg className="w-16 h-16 text-text-tertiary/30 group-hover:text-brand-400/40 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{watch.brand}</p>
                  <h3 className="font-semibold text-text-primary mt-1 text-lg group-hover:text-brand-700 transition-colors">{watch.model}</h3>
                  <p className="text-sm text-text-tertiary mt-1">{watch.collection}</p>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-xs bg-surface-sunken text-text-secondary px-2 py-0.5 rounded-md font-medium">{formatMovementType(watch.specs.movementType)}</span>
                    <span className="text-xs bg-surface-sunken text-text-secondary px-2 py-0.5 rounded-md font-medium">{watch.specs.caseDiameter}mm</span>
                    <span className="text-xs bg-surface-sunken text-text-secondary px-2 py-0.5 rounded-md font-medium">{watch.specs.waterResistance}m</span>
                  </div>
                  <p className="text-xl font-bold text-text-primary mt-4">{formatPrice(watch.price)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/watches" className="text-brand-600 font-medium text-sm">View all {watches.length} watches &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">Brands in our database</h2>
          <p className="mt-3 text-text-secondary">We cover respected mechanical watch brands with complete spec data for every model.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Object.values(BRANDS).map((brand) => {
            const count = watches.filter((w) => w.brand === brand.name).length;
            return (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group bg-white border border-border rounded-xl p-6 hover:shadow-md hover:border-brand-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-700 transition-colors">{brand.name}</h3>
                  <span className="text-xs bg-surface-sunken text-text-secondary px-2.5 py-1 rounded-full font-medium">{count} watches</span>
                </div>
                <p className="text-sm text-text-tertiary">{brand.country} &middot; Est. {brand.founded}</p>
                <p className="text-sm text-text-secondary mt-2 line-clamp-2">{brand.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Ready to find your next watch?</h2>
          <p className="mt-3 text-brand-100 max-w-lg mx-auto">Browse our complete database, filter by exactly what matters to you, and compare your top picks side by side.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/watches" className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold hover:bg-brand-50 transition-colors">Start Browsing</Link>
            <Link href="/compare" className="inline-flex items-center justify-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-800 transition-colors border border-brand-500">Open Compare Tool</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-secondary mt-0.5">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 hover:shadow-sm transition-shadow">
      <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">{icon}</svg>
      </div>
      <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
